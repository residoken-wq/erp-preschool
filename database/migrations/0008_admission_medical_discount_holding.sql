BEGIN;

-- Isolate health data so medical access and audit can be enforced separately.
CREATE TABLE medical_clearances (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  application_id uuid NOT NULL REFERENCES applications(id),
  cleared boolean NOT NULL DEFAULT false,
  allergy_flags jsonb NOT NULL DEFAULT '[]',
  special_health_needs text,
  data_classification varchar(3) NOT NULL DEFAULT 'HRI' CHECK (data_classification = 'HRI'),
  cleared_by uuid REFERENCES user_accounts(id),
  cleared_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  row_version bigint NOT NULL DEFAULT 1,
  UNIQUE (application_id)
);

-- Share versioned policy configuration across domains without hardcoded thresholds.
CREATE TABLE rule_configs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  campus_id uuid REFERENCES campuses(id),
  config_key varchar(100) NOT NULL,
  value_json jsonb NOT NULL,
  valid_from timestamptz NOT NULL DEFAULT now(),
  valid_to timestamptz,
  updated_by uuid REFERENCES user_accounts(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Allow only one open-ended configuration per organization/campus/key.
CREATE UNIQUE INDEX rule_configs_active_scope_key_idx
  ON rule_configs (organization_id, COALESCE(campus_id, '00000000-0000-0000-0000-000000000000'::uuid), config_key)
  WHERE valid_to IS NULL;

-- Preserve approval evidence and prevent requesters from approving their own requests.
CREATE TABLE approval_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  entity_type varchar(50) NOT NULL,
  entity_id uuid NOT NULL,
  requested_by uuid NOT NULL REFERENCES user_accounts(id),
  approver_id uuid REFERENCES user_accounts(id),
  threshold_snapshot jsonb NOT NULL,
  status varchar(20) NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED')),
  reason text,
  decided_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  row_version bigint NOT NULL DEFAULT 1,
  CHECK (approver_id IS NULL OR approver_id <> requested_by)
);

CREATE INDEX approval_requests_entity_idx ON approval_requests (entity_type, entity_id);

COMMIT;
