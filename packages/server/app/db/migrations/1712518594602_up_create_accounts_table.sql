CREATE TABLE account (
       account_id uuid DEFAULT uuid_generate_v4(),
       account_name VARCHAR(50) NOT NULL,
       created_on TIMESTAMPTZ NOT NULL DEFAULT now(),
       last_modified TIMESTAMPTZ NOT NULL DEFAULT now(),
       CONSTRAINT account_pk PRIMARY KEY (account_id)
);


ALTER TABLE user_auth
      ADD COLUMN IF NOT EXISTS account_id uuid NOT NULL;

ALTER TABLE user_auth
      ADD CONSTRAINT fk_account
      	  	     FOREIGN KEY (account_id)
		     	     REFERENCES  account(account_id)
			     ON DELETE CASCADE;
