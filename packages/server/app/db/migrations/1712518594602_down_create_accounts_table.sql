ALTER TABLE user_auth
      DROP CONSTRAINT  fk_account;

ALTER TABLE user_auth
      DROP COLUMN IF EXISTS account_id;
	     


DROP TABLE IF EXISTS accounts;
