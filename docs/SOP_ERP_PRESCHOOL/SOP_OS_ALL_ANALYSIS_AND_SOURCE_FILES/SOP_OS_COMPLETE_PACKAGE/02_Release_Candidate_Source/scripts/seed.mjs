import { readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import pg from 'pg';

const { Client } = pg;
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error('DATABASE_URL is required');

const seedPath = path.resolve(process.argv[2] ?? 'database/seed/demo-seed.json');
const seed = JSON.parse(await readFile(seedPath, 'utf8'));
const client = new Client({ connectionString: databaseUrl });
await client.connect();

async function upsertOrganization() {
  const o = seed.organization;
  await client.query(
    `INSERT INTO organizations(id, code, name, default_timezone, default_locale, status)
     VALUES ($1, $2, $3, $4, $5, $6)
     ON CONFLICT (code) DO UPDATE SET name = EXCLUDED.name, updated_at = now(), row_version = organizations.row_version + 1`,
    [o.id, o.code, o.name, o.default_timezone ?? 'Asia/Ho_Chi_Minh', o.default_locale ?? 'vi-VN', o.status ?? 'ACTIVE']
  );
}

async function seedCampuses() {
  for (const campus of seed.campuses ?? []) {
    await client.query(
      `INSERT INTO campuses(id, organization_id, code, name, status)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (organization_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status, updated_at = now(), row_version = campuses.row_version + 1`,
      [campus.id, seed.organization.id, campus.code, campus.name, campus.status ?? 'ACTIVE']
    );
  }
}

async function seedRoles() {
  for (const role of seed.roles ?? []) {
    await client.query(
      `INSERT INTO roles(organization_id, code, name) VALUES ($1, $2, $3)
       ON CONFLICT (organization_id, code) DO UPDATE SET name = EXCLUDED.name`,
      [seed.organization.id, role.code, role.name]
    );
  }
}

async function seedUsers() {
  for (const user of seed.demo_users ?? []) {
    await client.query(
      `INSERT INTO user_accounts(id, organization_id, email_normalized, display_name, status)
       VALUES ($1, $2, lower($3), $4, 'ACTIVE')
       ON CONFLICT (organization_id, email_normalized) DO UPDATE SET display_name = EXCLUDED.display_name, status = 'ACTIVE'`,
      [user.id, seed.organization.id, user.email, user.display_name]
    );
    for (const roleCode of user.roles ?? []) {
      for (const campusCode of user.campuses ?? [null]) {
        await client.query(
          `INSERT INTO user_role_scopes(organization_id, user_id, role_id, campus_id)
           SELECT $1, $2, r.id, c.id
           FROM roles r
           LEFT JOIN campuses c ON c.organization_id = $1 AND c.code = $4
           WHERE r.organization_id = $1 AND r.code = $3
             AND NOT EXISTS (
               SELECT 1 FROM user_role_scopes urs
               WHERE urs.user_id = $2 AND urs.role_id = r.id AND urs.campus_id IS NOT DISTINCT FROM c.id AND urs.valid_to IS NULL
             )`,
          [seed.organization.id, user.id, roleCode, campusCode]
        );
      }
    }
  }
}

async function seedProcesses() {
  const ids = new Map();
  for (const node of seed.process_nodes ?? []) {
    const parentId = node.parent ? ids.get(node.parent) : null;
    const result = await client.query(
      `INSERT INTO process_nodes(organization_id, parent_id, level, code, name)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (organization_id, code) DO UPDATE SET name = EXCLUDED.name, parent_id = EXCLUDED.parent_id
       RETURNING id`,
      [seed.organization.id, parentId, node.level, node.code, node.name]
    );
    ids.set(node.code, result.rows[0].id);
  }
  return ids;
}

async function seedSops(processIds) {
  for (const sop of seed.sop_register ?? []) {
    const processId = processIds.get(sop.code);
    if (!processId) continue;
    await client.query(
      `INSERT INTO sops(organization_id, process_node_id, code, title, sop_type, owner_role_id, priority)
       SELECT $1, $2, $3, $4, $5, r.id, $7
       FROM roles r WHERE r.organization_id = $1 AND r.code = $6
       ON CONFLICT (organization_id, code) DO UPDATE SET title = EXCLUDED.title, owner_role_id = EXCLUDED.owner_role_id`,
      [seed.organization.id, processId, sop.code, sop.title, sop.type, sop.owner_role, sop.priority ?? 'P0']
    );
  }
}

async function seedMvpDemo() {
  const demo = [
    { personId: '10000000-0000-7000-8000-000000000001', leadId: '20000000-0000-7000-8000-000000000001', code: 'LEAD-2026-0101', first: 'Lê', last: 'Gia Hân', email: 'ph.han@example.test', phone: '+84901234001', status: 'NEW' },
    { personId: '10000000-0000-7000-8000-000000000002', leadId: '20000000-0000-7000-8000-000000000002', code: 'LEAD-2026-0102', first: 'Nguyễn', last: 'Minh Khang', email: 'ph.khang@example.test', phone: '+84901234002', status: 'CONTACTED' },
    { personId: '10000000-0000-7000-8000-000000000003', leadId: '20000000-0000-7000-8000-000000000003', code: 'LEAD-2026-0103', first: 'Trần', last: 'Bảo An', email: 'ph.an@example.test', phone: '+84901234003', status: 'QUALIFIED' },
    { personId: '10000000-0000-7000-8000-000000000004', leadId: '20000000-0000-7000-8000-000000000004', code: 'LEAD-2026-0104', first: 'Phạm', last: 'Khánh Linh', email: 'ph.linh@example.test', phone: '+84901234004', status: 'CONVERTED' }
  ];
  for (const item of demo) {
    await client.query(
      `INSERT INTO persons(id, organization_id, first_name, last_name, email_normalized, phone_normalized, data_classification)
       VALUES ($1, $2, $3, $4, $5, $6, 'HRI') ON CONFLICT (id) DO UPDATE SET first_name = EXCLUDED.first_name, last_name = EXCLUDED.last_name`,
      [item.personId, seed.organization.id, item.first, item.last, item.email, item.phone]
    );
    await client.query(
      `INSERT INTO leads(id, organization_id, code, primary_contact_person_id, campus_id, source_type, owner_user_id, status, next_action_at)
       VALUES ($1, $2, $3, $4, $5, 'WEBSITE', $6, $7, now() + interval '1 day')
       ON CONFLICT (organization_id, code) DO UPDATE SET status = EXCLUDED.status, updated_at = now()`,
      [item.leadId, seed.organization.id, item.code, item.personId, seed.campuses[0].id, seed.demo_users[0].id, item.status]
    );
  }

  await client.query(
    `INSERT INTO applications(id, organization_id, code, lead_id, campus_id, program_code, intake_code, status, assigned_user_id)
     VALUES
       ('30000000-0000-7000-8000-000000000001', $1, 'APP-2026-0148', '20000000-0000-7000-8000-000000000004', $2, 'PRESCHOOL-4', '2026-FALL', 'INCOMPLETE', $3),
       ('30000000-0000-7000-8000-000000000002', $1, 'APP-2026-0149', '20000000-0000-7000-8000-000000000003', $2, 'PRESCHOOL-5', '2026-FALL', 'DOCUMENT_REVIEW', $3)
     ON CONFLICT (organization_id, code) DO UPDATE SET status = EXCLUDED.status, updated_at = now()`,
    [seed.organization.id, seed.campuses[0].id, seed.demo_users[0].id]
  );

  const taskRows = [
    ['40000000-0000-7000-8000-000000000001', 'APP-2026-0148 thiếu giấy khai sinh', 'Application', '30000000-0000-7000-8000-000000000001', 'HIGH', "now() - interval '2 hours'"],
    ['40000000-0000-7000-8000-000000000002', 'Review hồ sơ APP-2026-0149', 'Application', '30000000-0000-7000-8000-000000000002', 'NORMAL', "date_trunc('day', now()) + interval '17 hours'"],
    ['40000000-0000-7000-8000-000000000003', 'Liên hệ Lead LEAD-2026-0101', 'Lead', '20000000-0000-7000-8000-000000000001', 'URGENT', "now() + interval '1 hour'"]
  ];
  for (const [id, title, objectType, objectId, priority, dueExpression] of taskRows) {
    await client.query(
      `INSERT INTO work_items(id, organization_id, campus_id, assignee_user_id, title, related_object_type, related_object_id, priority, due_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, ${dueExpression})
       ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, priority = EXCLUDED.priority, due_at = EXCLUDED.due_at`,
      [id, seed.organization.id, seed.campuses[0].id, seed.demo_users[0].id, title, objectType, objectId, priority]
    );
  }

  const sopStates = { 'ADM-001': 'EFFECTIVE', 'ADM-004': 'IN_REVIEW', 'ADM-010': 'DRAFT' };
  for (const [code, status] of Object.entries(sopStates)) {
    const sop = await client.query(`SELECT id FROM sops WHERE organization_id = $1 AND code = $2`, [seed.organization.id, code]);
    if (!sop.rows[0]) continue;
    const version = await client.query(
      `INSERT INTO sop_versions(organization_id, sop_id, version_number, version_label, status, effective_from, review_due_at, created_by)
       VALUES ($1, $2, 1, 'v1.0', $3, CASE WHEN $3 = 'EFFECTIVE' THEN now() ELSE NULL END, CURRENT_DATE + 180, $4)
       ON CONFLICT (sop_id, version_number) DO UPDATE SET status = EXCLUDED.status RETURNING id`,
      [seed.organization.id, sop.rows[0].id, status, seed.demo_users[1].id]
    );
    const versionId = version.rows[0].id;
    await client.query(
      `INSERT INTO sop_sections(organization_id, sop_version_id, section_key, title, content_json, sort_order, completeness_state)
       VALUES ($1, $2, 'purpose', 'Mục đích', $3::jsonb, 1, 'VALID')
       ON CONFLICT (sop_version_id, section_key) DO NOTHING`,
      [seed.organization.id, versionId, JSON.stringify({ text: `Chuẩn hóa quy trình ${code} và bảo đảm khả năng truy vết.` })]
    );
    await client.query(
      `INSERT INTO sop_steps(organization_id, sop_version_id, step_no, name, actor_role_id, action_text, automation_type)
       SELECT $1, $2, 1, 'Kiểm tra đầu vào', r.id, 'Kiểm tra dữ liệu bắt buộc và điều kiện nghiệp vụ trước khi xử lý.', 'WORKFLOW'
       FROM roles r WHERE r.organization_id = $1 AND r.code = 'ADMISSION_OFFICER'
       ON CONFLICT (sop_version_id, step_no) DO NOTHING`,
      [seed.organization.id, versionId]
    );
  }
}

try {
  await client.query('BEGIN');
  await upsertOrganization();
  await seedCampuses();
  await seedRoles();
  await seedUsers();
  const processIds = await seedProcesses();
  await seedSops(processIds);
  await seedMvpDemo();
  await client.query('COMMIT');
  console.log(`Seed complete from ${seedPath}`);
} catch (error) {
  await client.query('ROLLBACK');
  throw error;
} finally {
  await client.end();
}
