CREATE TABLE email_owner (
       email_owner_id uuid DEFAULT uuid_generate_v4(),
       is_person BOOLEAN NOT NULL,
       CONSTRAINT email_owner_pk PRIMARY KEY (email_owner_id)
);

CREATE TABLE email_account (
       email_account_id uuid DEFAULT uuid_generate_v4(),
       email_owner_id uuid NOT NULL, 
       email_name VARCHAR NOT NULL,
       email_address VARCHAR NOT NULL,
       CONSTRAINT email_account_pk PRIMARY KEY (email_account_id),
       CONSTRAINT fk_email_account_has_owner FOREIGN KEY (email_owner_id) REFERENCES email_owner(email_owner_id)
);

CREATE TABLE email_owner_sub_account (
       email_owner_id uuid NOT NULL,
       account_id uuid NOT NULL,
       CONSTRAINT fk_email_owner_sub_account_is_owner  FOREIGN KEY (email_owner_id) REFERENCES email_owner(email_owner_id),
       CONSTRAINT fk_email_owner_sub_account FOREIGN KEY (account_id) REFERENCES account(account_id),
       CONSTRAINT email_owner_sub_account_pk PRIMARY KEY (email_owner_id)
); 

CREATE TABLE email_owner_sub_person (
       email_owner_id uuid NOT NULL,
       user_auth_id uuid NOT NULL,
       CONSTRAINT fk_email_owner_sub_person_is_owner FOREIGN KEY (email_owner_id) REFERENCES email_owner(email_owner_id),
       CONSTRAINT fk_person_email_owner FOREIGN KEY (user_auth_id) REFERENCES user_auth(user_auth_id),
       CONSTRAINT email_owner_sub_person_pk PRIMARY KEY (email_owner_id)
);

CREATE TABLE email_credential (
       email_credential_id uuid DEFAULT uuid_generate_v4(),
       email_account_id uuid NOT NULL,
       CONSTRAINT fk_email_credential_has_account FOREIGN KEY (email_account_id) REFERENCES email_account(email_account_id),
       CONSTRAINT email_credential_pk PRIMARY KEY (email_credential_id)
);

CREATE TABLE imap_oauth (
       email_credential_id uuid NOT NULL,
       oauth_token VARCHAR NOT NULL,
       refresh_token VARCHAR NOT NULL,
       CONSTRAINT fk_imap_oauth_is_email_credential FOREIGN KEY (email_credential_id) REFERENCES email_credential(email_credential_id),
       CONSTRAINT imap_oauth_pk PRIMARY KEY (email_credential_id)
);

CREATE TABLE email_message (
       email_message_id uuid DEFAULT uuid_generate_v4(),
       title VARCHAR NOT NULL,
       first_line VARCHAR NOT NULL,
       sender_name VARCHAR NOT NULL,
       send_date TIMESTAMPTZ NOT NULL,
       maildir_identifier VARCHAR NOT NULL,
       email_account_id uuid NOT NULL,
       imap_uid uuid,
       CONSTRAINT email_message_has_account_fk FOREIGN KEY (email_account_id) REFERENCES email_account(email_account_id),
       CONSTRAINT email_message_pk PRIMARY KEY (email_message_id) 
);

