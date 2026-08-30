BEGIN;

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS schema_migrations (
  version text PRIMARY KEY,
  applied_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code varchar(30) NOT NULL UNIQUE,
  name varchar(255) NOT NULL,
  default_timezone varchar(64) NOT NULL DEFAULT 'Asia/Ho_Chi_Minh',
  default_locale varchar(16) NOT NULL DEFAULT 'vi-VN',
  status varchar(20) NOT NULL CHECK (status IN ('ACTIVE', 'INACTIVE')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  row_version bigint NOT NULL DEFAULT 1
);

CREATE TABLE campuses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  code varchar(30) NOT NULL,
  name varchar(255) NOT NULL,
  timezone varchar(64),
  status varchar(20) NOT NULL CHECK (status IN ('ACTIVE', 'INACTIVE')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  row_version bigint NOT NULL DEFAULT 1,
  UNIQUE (organization_id, code)
);

CREATE TABLE user_accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  external_subject varchar(255),
  email_normalized varchar(320) NOT NULL,
  display_name varchar(255) NOT NULL,
  account_type varchar(20) NOT NULL DEFAULT 'STAFF' CHECK (account_type IN ('STAFF', 'PARENT', 'SERVICE')),
  status varchar(20) NOT NULL CHECK (status IN ('INVITED', 'ACTIVE', 'SUSPENDED', 'DISABLED')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  row_version bigint NOT NULL DEFAULT 1,
  UNIQUE (organization_id, email_normalized)
);

CREATE TABLE roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  code varchar(80) NOT NULL,
  name varchar(255) NOT NULL,
  status varchar(20) NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'INACTIVE')),
  UNIQUE (organization_id, code)
);

CREATE TABLE permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  resource varchar(80) NOT NULL,
  action varchar(80) NOT NULL,
  UNIQUE (resource, action)
);

CREATE TABLE role_permissions (
  role_id uuid NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  permission_id uuid NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
  PRIMARY KEY (role_id, permission_id)
);

CREATE TABLE user_role_scopes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  user_id uuid NOT NULL REFERENCES user_accounts(id) ON DELETE CASCADE,
  role_id uuid NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  campus_id uuid REFERENCES campuses(id),
  domain_code varchar(50),
  valid_from timestamptz NOT NULL DEFAULT now(),
  valid_to timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK (valid_to IS NULL OR valid_to > valid_from)
);

CREATE INDEX user_role_scopes_active_idx
  ON user_role_scopes (user_id, organization_id, campus_id)
  WHERE valid_to IS NULL;

CREATE TABLE audit_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  occurred_at timestamptz NOT NULL DEFAULT now(),
  actor_type varchar(20) NOT NULL CHECK (actor_type IN ('USER', 'SERVICE', 'SYSTEM')),
  actor_id uuid,
  action varchar(100) NOT NULL,
  object_type varchar(100) NOT NULL,
  object_id uuid NOT NULL,
  before_json jsonb,
  after_json jsonb,
  reason text,
  source_ip inet,
  correlation_id uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX audit_object_time_idx ON audit_events (object_type, object_id, occurred_at DESC);
CREATE INDEX audit_actor_time_idx ON audit_events (actor_id, occurred_at DESC);

CREATE OR REPLACE FUNCTION prevent_audit_mutation() RETURNS trigger AS $$
BEGIN
  RAISE EXCEPTION 'audit_events is append-only';
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER audit_events_no_update
  BEFORE UPDATE OR DELETE ON audit_events
  FOR EACH ROW EXECUTE FUNCTION prevent_audit_mutation();

CREATE TABLE outbox_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  event_type varchar(120) NOT NULL,
  event_version integer NOT NULL DEFAULT 1,
  aggregate_type varchar(100) NOT NULL,
  aggregate_id uuid NOT NULL,
  payload_json jsonb NOT NULL,
  correlation_id uuid,
  causation_id uuid,
  status varchar(20) NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'PROCESSING', 'PROCESSED', 'DEAD_LETTER')),
  attempts integer NOT NULL DEFAULT 0,
  next_attempt_at timestamptz NOT NULL DEFAULT now(),
  locked_at timestamptz,
  occurred_at timestamptz NOT NULL DEFAULT now(),
  processed_at timestamptz,
  last_error text
);

CREATE INDEX outbox_pending_idx ON outbox_events (next_attempt_at, occurred_at)
  WHERE status IN ('PENDING', 'PROCESSING');

COMMIT;
