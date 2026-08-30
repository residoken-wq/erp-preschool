BEGIN;

ALTER TABLE audit_events ADD COLUMN prev_hash varchar(64);
ALTER TABLE audit_events ADD COLUMN event_hash varchar(64);
ALTER TABLE audit_events ADD COLUMN chain_no bigint GENERATED ALWAYS AS IDENTITY;

CREATE UNIQUE INDEX audit_event_hash_unique_idx ON audit_events (event_hash) WHERE event_hash IS NOT NULL;

CREATE OR REPLACE FUNCTION chain_audit_event() RETURNS trigger AS $$
BEGIN
  PERFORM pg_advisory_xact_lock(hashtext(NEW.organization_id::text));
  SELECT event_hash INTO NEW.prev_hash
  FROM audit_events
  WHERE organization_id = NEW.organization_id AND event_hash IS NOT NULL
  ORDER BY chain_no DESC
  LIMIT 1;

  NEW.event_hash := encode(digest(concat_ws('|',
    coalesce(NEW.prev_hash, ''), NEW.id::text, NEW.organization_id::text,
    extract(epoch FROM NEW.occurred_at)::text, NEW.action, NEW.object_type, NEW.object_id::text,
    coalesce(NEW.before_json::text, ''), coalesce(NEW.after_json::text, ''),
    coalesce(NEW.reason, '')
  ), 'sha256'), 'hex');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER audit_events_hash_chain
  BEFORE INSERT ON audit_events
  FOR EACH ROW EXECUTE FUNCTION chain_audit_event();

CREATE TABLE security_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES organizations(id),
  occurred_at timestamptz NOT NULL DEFAULT now(),
  event_type varchar(100) NOT NULL,
  severity varchar(10) NOT NULL CHECK (severity IN ('INFO', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL')),
  actor_id uuid,
  source_ip inet,
  correlation_id uuid,
  detail_json jsonb NOT NULL DEFAULT '{}'
);

CREATE INDEX security_events_severity_time_idx ON security_events (severity, occurred_at DESC);

COMMIT;
