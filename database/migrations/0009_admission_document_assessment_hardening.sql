BEGIN;

-- Bring application_documents to the same optimistic-concurrency shape as every other
-- Application-scoped table (assessments, medical_clearances, offers) before a
-- verify/reject service is built on top of it.
ALTER TABLE application_documents
  ADD COLUMN updated_at timestamptz NOT NULL DEFAULT now(),
  ADD COLUMN row_version bigint NOT NULL DEFAULT 1;

-- Every read path for these two tables filters by application_id; without an index
-- that's a full scan once seed/demo data grows past a handful of rows.
CREATE INDEX application_documents_application_id_idx ON application_documents (application_id);
CREATE INDEX assessments_application_id_idx ON assessments (application_id);

COMMIT;
