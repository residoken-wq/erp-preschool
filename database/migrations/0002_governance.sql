BEGIN;

CREATE TABLE process_nodes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  parent_id uuid REFERENCES process_nodes(id),
  level varchar(2) NOT NULL CHECK (level IN ('L0', 'L1', 'L2', 'L3')),
  code varchar(50) NOT NULL,
  name varchar(255) NOT NULL,
  description text,
  process_owner_role_id uuid REFERENCES roles(id),
  priority varchar(2) NOT NULL DEFAULT 'P0' CHECK (priority IN ('P0', 'P1', 'P2')),
  process_type varchar(20) NOT NULL DEFAULT 'OPERATIONAL' CHECK (process_type IN ('OPERATIONAL', 'CONTROL', 'MANAGEMENT', 'COMPLIANCE')),
  status varchar(20) NOT NULL DEFAULT 'PROPOSED' CHECK (status IN ('PROPOSED', 'APPROVED', 'RETIRED')),
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  row_version bigint NOT NULL DEFAULT 1,
  UNIQUE (organization_id, code)
);

CREATE TABLE process_dependencies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  source_process_id uuid NOT NULL REFERENCES process_nodes(id),
  target_process_id uuid NOT NULL REFERENCES process_nodes(id),
  dependency_type varchar(30) NOT NULL CHECK (dependency_type IN ('UPSTREAM', 'DOWNSTREAM', 'SHARED_SERVICE', 'DATA', 'EVENT')),
  description text,
  UNIQUE (source_process_id, target_process_id, dependency_type),
  CHECK (source_process_id <> target_process_id)
);

CREATE TABLE sops (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  process_node_id uuid NOT NULL REFERENCES process_nodes(id),
  code varchar(50) NOT NULL,
  title varchar(255) NOT NULL,
  sop_type varchar(20) NOT NULL CHECK (sop_type IN ('OPERATIONAL', 'CONTROL', 'MANAGEMENT', 'COMPLIANCE')),
  owner_role_id uuid REFERENCES roles(id),
  priority varchar(2) NOT NULL DEFAULT 'P0' CHECK (priority IN ('P0', 'P1', 'P2')),
  lifecycle_status varchar(20) NOT NULL DEFAULT 'ACTIVE' CHECK (lifecycle_status IN ('ACTIVE', 'RETIRED')),
  review_cycle_months smallint CHECK (review_cycle_months IS NULL OR review_cycle_months > 0),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  row_version bigint NOT NULL DEFAULT 1,
  UNIQUE (organization_id, code)
);

CREATE TABLE sop_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  sop_id uuid NOT NULL REFERENCES sops(id),
  version_number integer NOT NULL CHECK (version_number > 0),
  version_label varchar(30) NOT NULL,
  status varchar(30) NOT NULL CHECK (status IN ('DRAFT', 'IN_REVIEW', 'REVISION_REQUIRED', 'APPROVED', 'SCHEDULED', 'EFFECTIVE', 'SUPERSEDED', 'ARCHIVED')),
  based_on_version_id uuid REFERENCES sop_versions(id),
  change_summary text,
  effective_from timestamptz,
  effective_to timestamptz,
  review_due_at date,
  approved_at timestamptz,
  approved_by uuid REFERENCES user_accounts(id),
  content_hash varchar(128),
  locked_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  row_version bigint NOT NULL DEFAULT 1,
  UNIQUE (sop_id, version_number),
  CHECK (effective_to IS NULL OR effective_from IS NULL OR effective_to > effective_from)
);

CREATE UNIQUE INDEX sop_one_effective_version_idx ON sop_versions (sop_id)
  WHERE status = 'EFFECTIVE';

CREATE TABLE sop_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  sop_version_id uuid NOT NULL REFERENCES sop_versions(id) ON DELETE CASCADE,
  section_key varchar(50) NOT NULL,
  title varchar(255) NOT NULL,
  content_json jsonb NOT NULL DEFAULT '{}',
  schema_version integer NOT NULL DEFAULT 1,
  sort_order smallint NOT NULL,
  completeness_state varchar(20) NOT NULL DEFAULT 'EMPTY' CHECK (completeness_state IN ('EMPTY', 'DRAFT', 'VALID', 'NEEDS_REVIEW')),
  row_version bigint NOT NULL DEFAULT 1,
  UNIQUE (sop_version_id, section_key),
  UNIQUE (sop_version_id, sort_order)
);

CREATE TABLE sop_steps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  sop_version_id uuid NOT NULL REFERENCES sop_versions(id) ON DELETE CASCADE,
  section_id uuid REFERENCES sop_sections(id) ON DELETE SET NULL,
  step_no integer NOT NULL CHECK (step_no > 0),
  name varchar(255) NOT NULL,
  actor_role_id uuid NOT NULL REFERENCES roles(id),
  action_text text NOT NULL,
  input_json jsonb,
  output_json jsonb,
  status_before varchar(50),
  status_after varchar(50),
  exception_summary text,
  automation_type varchar(20) CHECK (automation_type IN ('MANUAL', 'AUTO', 'AI', 'RULE', 'WORKFLOW', 'INTEGRATION', 'OCR', 'RPA')),
  row_version bigint NOT NULL DEFAULT 1,
  UNIQUE (sop_version_id, step_no)
);

CREATE INDEX sop_title_fts_idx ON sops USING gin (to_tsvector('simple', code || ' ' || title));

COMMIT;

