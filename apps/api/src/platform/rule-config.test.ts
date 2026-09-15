import { randomUUID } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { createTestPool, withRollback } from './test-db.js';
import { getActiveRuleConfigValue } from './rule-config.js';

describe.skipIf(!process.env.DATABASE_URL)('active rule configuration PostgreSQL scope', () => {
  it('prefers campus, falls back to organization, excludes closed and foreign configurations', async () => {
    const pool = createTestPool();
    try {
      await withRollback(pool, async (client) => {
        const organizationId = randomUUID();
        const campusId = randomUUID();
        await client.query(`INSERT INTO organizations(id, code, name, status) VALUES ($1::uuid, left($1::text, 30), 'Synthetic-test', 'ACTIVE')`, [organizationId]);
        await client.query(`INSERT INTO campuses(id, organization_id, code, name, status) VALUES ($1::uuid, $2, left($1::text, 30), 'Synthetic-test', 'ACTIVE')`, [campusId, organizationId]);
        const params = { organizationId, campusId, configKey: 'synthetic.threshold' };
        expect(await getActiveRuleConfigValue(client, params)).toBeNull();
        await client.query(`INSERT INTO rule_configs(organization_id, config_key, value_json) VALUES ($1, $2, '10')`, [organizationId, params.configKey]);
        expect(await getActiveRuleConfigValue(client, params)).toBe(10);
        await client.query(`INSERT INTO rule_configs(organization_id, campus_id, config_key, value_json) VALUES ($1, $2, $3, '20')`, [organizationId, campusId, params.configKey]);
        expect(await getActiveRuleConfigValue(client, params)).toBe(20);
        expect(await getActiveRuleConfigValue(client, { ...params, campusId: null })).toBe(10);
        expect(await getActiveRuleConfigValue(client, { ...params, organizationId: randomUUID() })).toBeNull();
        await client.query('UPDATE rule_configs SET valid_to = now() WHERE organization_id = $1 AND campus_id = $2', [organizationId, campusId]);
        expect(await getActiveRuleConfigValue(client, params)).toBe(10);
        expect(await getActiveRuleConfigValue(client, { ...params, configKey: 'absent' })).toBeNull();
      });
    } finally { await pool.end(); }
  });
});
