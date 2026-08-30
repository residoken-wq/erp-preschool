BEGIN;

CREATE TABLE persons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  first_name varchar(100) NOT NULL,
  middle_name varchar(100),
  last_name varchar(100) NOT NULL,
  preferred_name varchar(100),
  date_of_birth date,
  data_classification varchar(3) NOT NULL DEFAULT 'HRI' CHECK (data_classification IN ('PUB', 'INT', 'CON', 'HRI')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  row_version bigint NOT NULL DEFAULT 1
);

CREATE TABLE leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  code varchar(50) NOT NULL,
  primary_contact_person_id uuid NOT NULL REFERENCES persons(id),
  campus_id uuid REFERENCES campuses(id),
  source_type varchar(30) NOT NULL,
  owner_user_id uuid REFERENCES user_accounts(id),
  status varchar(20) NOT NULL CHECK (status IN ('NEW', 'ASSIGNED', 'CONTACTED', 'QUALIFIED', 'NURTURING', 'CONVERTED', 'DISQUALIFIED', 'LOST', 'DUPLICATE', 'ARCHIVED')),
  priority varchar(10) NOT NULL DEFAULT 'NORMAL' CHECK (priority IN ('LOW', 'NORMAL', 'HIGH')),
  next_action_at timestamptz,
  close_reason_code varchar(50),
  duplicate_of_lead_id uuid REFERENCES leads(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  row_version bigint NOT NULL DEFAULT 1,
  UNIQUE (organization_id, code)
);

CREATE INDEX leads_campus_status_created_idx ON leads (campus_id, status, created_at DESC);

CREATE TABLE applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  code varchar(50) NOT NULL,
  lead_id uuid REFERENCES leads(id),
  campus_id uuid NOT NULL REFERENCES campuses(id),
  program_code varchar(50) NOT NULL,
  intake_code varchar(50) NOT NULL,
  status varchar(30) NOT NULL CHECK (status IN ('DRAFT', 'SUBMITTED', 'DOCUMENT_REVIEW', 'INCOMPLETE', 'VERIFIED', 'ASSESSMENT_PENDING', 'ASSESSED', 'DECISION_PENDING', 'OFFERED', 'WAITLISTED', 'REJECTED')),
  current_checklist_version integer NOT NULL DEFAULT 1,
  assigned_user_id uuid REFERENCES user_accounts(id),
  submitted_at timestamptz,
  verified_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  row_version bigint NOT NULL DEFAULT 1,
  UNIQUE (organization_id, code)
);

CREATE INDEX applications_campus_status_created_idx ON applications (campus_id, status, created_at DESC);

COMMIT;

