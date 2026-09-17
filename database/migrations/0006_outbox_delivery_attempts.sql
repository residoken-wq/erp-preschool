BEGIN;

ALTER TABLE outbox_events
  ADD CONSTRAINT outbox_events_organization_id_id_unique UNIQUE (organization_id, id);

CREATE TABLE outbox_delivery_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL,
  outbox_event_id uuid NOT NULL,
  attempt_no integer NOT NULL CHECK (attempt_no > 0),
  provider varchar(80) NOT NULL,
  outcome varchar(30) NOT NULL CHECK (outcome IN ('SUCCEEDED', 'RETRYABLE_FAILURE', 'PERMANENT_FAILURE')),
  provider_receipt_id varchar(255),
  error_code varchar(100),
  started_at timestamptz NOT NULL,
  finished_at timestamptz NOT NULL,
  CONSTRAINT outbox_delivery_attempt_event_fk
    FOREIGN KEY (organization_id, outbox_event_id)
    REFERENCES outbox_events (organization_id, id),
  CONSTRAINT outbox_delivery_attempt_number_unique UNIQUE (outbox_event_id, attempt_no),
  CONSTRAINT outbox_delivery_attempt_result_check CHECK (
    (outcome = 'SUCCEEDED' AND provider_receipt_id IS NOT NULL AND error_code IS NULL)
    OR
    (outcome <> 'SUCCEEDED' AND provider_receipt_id IS NULL AND error_code IS NOT NULL)
  )
);

CREATE INDEX outbox_delivery_attempt_org_event_idx
  ON outbox_delivery_attempts (organization_id, outbox_event_id, attempt_no DESC);

COMMIT;
