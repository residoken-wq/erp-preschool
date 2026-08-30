BEGIN;

ALTER TABLE persons ADD COLUMN email_normalized varchar(320);
ALTER TABLE persons ADD COLUMN phone_normalized varchar(32);
CREATE INDEX persons_contact_lookup_idx ON persons (organization_id, email_normalized, phone_normalized);

ALTER TABLE sop_versions ADD COLUMN created_by uuid REFERENCES user_accounts(id);

CREATE TABLE work_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  campus_id uuid REFERENCES campuses(id),
  assignee_user_id uuid REFERENCES user_accounts(id),
  title varchar(255) NOT NULL,
  description text,
  related_object_type varchar(80),
  related_object_id uuid,
  priority varchar(10) NOT NULL DEFAULT 'NORMAL' CHECK (priority IN ('LOW', 'NORMAL', 'HIGH', 'URGENT')),
  status varchar(20) NOT NULL DEFAULT 'OPEN' CHECK (status IN ('OPEN', 'IN_PROGRESS', 'DONE', 'CANCELLED')),
  due_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  row_version bigint NOT NULL DEFAULT 1
);

CREATE INDEX work_items_assignee_due_idx ON work_items (assignee_user_id, status, due_at);

CREATE TABLE lead_interactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  lead_id uuid NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  channel varchar(30) NOT NULL CHECK (channel IN ('PHONE', 'EMAIL', 'MEETING', 'CHAT', 'TOUR', 'OTHER')),
  outcome varchar(80),
  notes text NOT NULL,
  occurred_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid REFERENCES user_accounts(id),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE application_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  application_id uuid NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  document_type varchar(80) NOT NULL,
  file_name varchar(255) NOT NULL,
  storage_key varchar(500) NOT NULL,
  mime_type varchar(120) NOT NULL,
  file_size_bytes bigint NOT NULL CHECK (file_size_bytes > 0),
  scan_status varchar(20) NOT NULL DEFAULT 'PENDING' CHECK (scan_status IN ('PENDING', 'CLEAN', 'QUARANTINED', 'FAILED')),
  verification_status varchar(20) NOT NULL DEFAULT 'PENDING' CHECK (verification_status IN ('PENDING', 'VERIFIED', 'REJECTED')),
  verification_reason text,
  uploaded_by uuid REFERENCES user_accounts(id),
  uploaded_at timestamptz NOT NULL DEFAULT now(),
  verified_by uuid REFERENCES user_accounts(id),
  verified_at timestamptz
);

CREATE TABLE assessments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  application_id uuid NOT NULL REFERENCES applications(id),
  assessor_user_id uuid REFERENCES user_accounts(id),
  template_code varchar(80) NOT NULL,
  template_version integer NOT NULL DEFAULT 1,
  status varchar(20) NOT NULL DEFAULT 'SCHEDULED' CHECK (status IN ('SCHEDULED', 'IN_PROGRESS', 'FINALIZED', 'CANCELLED')),
  scheduled_at timestamptz,
  result_json jsonb,
  recommendation varchar(80),
  finalized_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  row_version bigint NOT NULL DEFAULT 1
);

CREATE TABLE offers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  application_id uuid NOT NULL REFERENCES applications(id),
  code varchar(50) NOT NULL,
  version_number integer NOT NULL DEFAULT 1,
  status varchar(30) NOT NULL DEFAULT 'DRAFT' CHECK (status IN ('DRAFT', 'PENDING_APPROVAL', 'APPROVED', 'ISSUED', 'ACCEPTED', 'DECLINED', 'EXPIRED', 'WITHDRAWN')),
  terms_json jsonb NOT NULL DEFAULT '{}',
  valid_until timestamptz,
  approved_by uuid REFERENCES user_accounts(id),
  approved_at timestamptz,
  issued_at timestamptz,
  responded_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  row_version bigint NOT NULL DEFAULT 1,
  UNIQUE (organization_id, code, version_number)
);

CREATE TABLE enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  application_id uuid NOT NULL REFERENCES applications(id),
  offer_id uuid NOT NULL REFERENCES offers(id),
  code varchar(50) NOT NULL,
  campus_id uuid NOT NULL REFERENCES campuses(id),
  program_code varchar(50) NOT NULL,
  intake_code varchar(50) NOT NULL,
  status varchar(30) NOT NULL DEFAULT 'PENDING_CONFIRMATION' CHECK (status IN ('PENDING_CONFIRMATION', 'CONFIRMED', 'PENDING_CONDITION', 'READY_FOR_HANDOVER', 'HANDED_OVER', 'ON_HOLD', 'CANCELLED')),
  confirmed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  row_version bigint NOT NULL DEFAULT 1,
  UNIQUE (organization_id, code)
);

CREATE TABLE contracts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  enrollment_id uuid NOT NULL REFERENCES enrollments(id),
  code varchar(50) NOT NULL,
  version_number integer NOT NULL DEFAULT 1,
  status varchar(30) NOT NULL DEFAULT 'DRAFT' CHECK (status IN ('DRAFT', 'PENDING_REVIEW', 'PENDING_SIGNATURE', 'ACTIVE', 'REJECTED', 'VOIDED', 'TERMINATED', 'EXPIRED')),
  terms_json jsonb NOT NULL DEFAULT '{}',
  activated_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  row_version bigint NOT NULL DEFAULT 1,
  UNIQUE (organization_id, code, version_number)
);

CREATE TABLE fee_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  enrollment_id uuid NOT NULL REFERENCES enrollments(id),
  code varchar(50) NOT NULL,
  status varchar(20) NOT NULL DEFAULT 'DRAFT' CHECK (status IN ('DRAFT', 'PENDING_APPROVAL', 'ACTIVE', 'REJECTED', 'VOIDED')),
  currency char(3) NOT NULL DEFAULT 'VND',
  total_amount numeric(18,2) NOT NULL CHECK (total_amount >= 0),
  schedule_json jsonb NOT NULL DEFAULT '[]',
  activated_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  row_version bigint NOT NULL DEFAULT 1,
  UNIQUE (organization_id, code)
);

CREATE TABLE handover_packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  enrollment_id uuid NOT NULL REFERENCES enrollments(id),
  status varchar(30) NOT NULL DEFAULT 'NOT_READY' CHECK (status IN ('NOT_READY', 'READY', 'SUBMITTED', 'RETURNED', 'ACCEPTED')),
  checklist_json jsonb NOT NULL DEFAULT '[]',
  exception_reason text,
  submitted_at timestamptz,
  accepted_at timestamptz,
  accepted_by uuid REFERENCES user_accounts(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  row_version bigint NOT NULL DEFAULT 1,
  UNIQUE (enrollment_id)
);

CREATE TABLE sop_review_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  sop_version_id uuid NOT NULL REFERENCES sop_versions(id) ON DELETE CASCADE,
  section_id uuid REFERENCES sop_sections(id) ON DELETE SET NULL,
  step_id uuid REFERENCES sop_steps(id) ON DELETE SET NULL,
  author_user_id uuid NOT NULL REFERENCES user_accounts(id),
  body text NOT NULL,
  status varchar(20) NOT NULL DEFAULT 'OPEN' CHECK (status IN ('OPEN', 'RESOLVED')),
  created_at timestamptz NOT NULL DEFAULT now(),
  resolved_at timestamptz,
  resolved_by uuid REFERENCES user_accounts(id)
);

COMMIT;
