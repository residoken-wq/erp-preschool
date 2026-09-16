BEGIN;

-- Who may pick up a specific enrolled child. HRI per AGENTS.md §5 ("authorized pickup"
-- is listed explicitly); mutable (blocked flag can change), unlike attendance_events.
CREATE TABLE parent_guardians (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  person_id uuid NOT NULL REFERENCES persons(id),
  enrollment_id uuid NOT NULL REFERENCES enrollments(id) ON DELETE CASCADE,
  relationship varchar(50) NOT NULL,
  is_permanent boolean NOT NULL DEFAULT true,
  authorized_for_pickup boolean NOT NULL DEFAULT true,
  blocked boolean NOT NULL DEFAULT false,
  id_card_number varchar(50),
  data_classification varchar(3) NOT NULL DEFAULT 'HRI' CHECK (data_classification = 'HRI'),
  created_by uuid REFERENCES user_accounts(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  row_version bigint NOT NULL DEFAULT 1,
  UNIQUE (enrollment_id, person_id)
);

CREATE INDEX parent_guardians_enrollment_idx ON parent_guardians (enrollment_id);

-- Append-only touchpoint log (gate check-in, class check-in, pickup request, handover
-- confirmation, gate check-out, unexcused-absent alert) - one independently-timestamped,
-- independently-actored row per event, not one mutable row per child per day.
CREATE TABLE attendance_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  enrollment_id uuid NOT NULL REFERENCES enrollments(id),
  event_type varchar(30) NOT NULL CHECK (event_type IN (
    'GATE_CHECK_IN', 'CLASS_CHECK_IN', 'PICKUP_REQUESTED', 'HANDOVER_CONFIRMED',
    'GATE_CHECK_OUT', 'UNEXCUSED_ABSENT_ALERT'
  )),
  occurred_at timestamptz NOT NULL DEFAULT now(),
  actor_user_id uuid REFERENCES user_accounts(id),
  guardian_id uuid REFERENCES parent_guardians(id),
  verification_method varchar(20) CHECK (verification_method IN (
    'QR', 'FACE_ID', 'OTP', 'MANUAL_OVERRIDE', 'SYSTEM'
  )),
  client_event_id uuid,
  metadata_json jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (enrollment_id, event_type, client_event_id)
);

CREATE INDEX attendance_events_enrollment_time_idx ON attendance_events (enrollment_id, occurred_at DESC);

-- Immutable evidence of who was checked in/out and by whom (SOP-SIS-001 §22 audit
-- trail, KPI "0% sai/nhầm trẻ") - same pattern as audit_events, not just a code promise.
CREATE OR REPLACE FUNCTION prevent_attendance_event_mutation() RETURNS trigger AS $$
BEGIN
  RAISE EXCEPTION 'attendance_events is append-only';
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER attendance_events_no_update
  BEFORE UPDATE OR DELETE ON attendance_events
  FOR EACH ROW EXECUTE FUNCTION prevent_attendance_event_mutation();

COMMIT;
