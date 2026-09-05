BEGIN;

ALTER TABLE offers
  ADD COLUMN created_by uuid REFERENCES user_accounts(id);

COMMIT;
