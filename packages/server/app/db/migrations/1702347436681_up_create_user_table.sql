CREATE TABLE user_auth (
       user_auth_id uuid DEFAULT uuid_generate_v4(),
       user_first_name VARCHAR(50) NOT NULL,
       user_last_name VARCHAR(50) NOT NULL,
       email VARCHAR(255) UNIQUE NOT NULL,
       password_hash VARCHAR NOT NULL, 
       is_active BOOLEAN NOT NULL,
       created_on TIMESTAMPTZ NOT NULL DEFAULT now(),
       last_modified TIMESTAMPTZ NOT NULL DEFAULT now(),
       CONSTRAINT user_auth_pk PRIMARY KEY (user_auth_id)
);

CREATE TABLE user_signup_email_confirm (
       user_signup_email_confirm_id uuid DEFAULT uuid_generate_v4(),
       user_auth_id uuid NOT NULL,
       hash_link uuid NOT NULL DEFAULT uuid_generate_v4(),
       created_on TIMESTAMPTZ NOT NULL DEFAULT now(),
       last_modified TIMESTAMPTZ NOT NULL DEFAULT now(),
       CONSTRAINT user_signup_email_confirm_pk PRIMARY KEY (user_signup_email_confirm_id),
       CONSTRAINT fk_user_auth
       		  FOREIGN KEY (user_auth_id)
		  	  REFERENCES user_auth(user_auth_id)
			  ON DELETE SET NULL
);
