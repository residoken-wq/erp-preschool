import type { PoolClient } from 'pg';

export async function getActiveRuleConfigValue(client: PoolClient, params: { organizationId: string; campusId: string | null; configKey: string }): Promise<unknown> {
  const result = await client.query<{ value: unknown }>(
    `SELECT value_json AS value FROM rule_configs
     WHERE organization_id = $1 AND (campus_id = $2 OR campus_id IS NULL)
       AND config_key = $3 AND valid_to IS NULL
     ORDER BY campus_id NULLS LAST LIMIT 1`,
    [params.organizationId, params.campusId, params.configKey]
  );
  return result.rows[0]?.value ?? null;
}
