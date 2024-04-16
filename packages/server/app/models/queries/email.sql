/* @name GetEmailOwnerById
*/
SELECT email_owner_id, is_person
FROM email_owner
WHERE email_owner_id = :email_owner_id!;

/* @name GetEmailOwnerByAccountId
*/
SELECT email_owner_id, account_id
FROM email_owner_sub_account
WHERE account_id = :account_id!;


/* @name GetEmailOwnerSubAccountById
*/
SELECT email_owner_id, account_id
FROM email_owner_sub_account
WHERE email_owner_id = :email_owner_id!;


/* @name GetEmailOwnerByPersonId
*/
SELECT email_owner_id, user_auth_id
FROM email_owner_sub_person
WHERE user_auth_id = :user_auth_id!;

/* @name GetEmailOwnerSubPersonById
*/
SELECT email_owner_id, user_auth_id
FROM email_owner_sub_person
WHERE email_owner_id = :email_owner_id!;


/* @name InsertEmailOwner */
INSERT INTO email_owner (is_person)
VALUES (:is_person!) RETURNING email_owner_id;

/* @name InsertEmailOwnerSubAccount
   @param sub_person -> (owner, owner_sub_id)
*/
INSERT INTO email_owner_sub_account (email_owner_id, account_id)
VALUES :sub_person!  RETURNING email_owner_id;

/* @name InsetEmailOwnerSubPerson
   @param sub_person -> (owner, owner_sub_id)

*/
INSERT INTO email_owner_sub_person (email_owner_id, user_auth_id)
VALUES :sub_person RETURNING email_owner_id;

/* @name InsertEmailAccount
   @param email_account ->  (email_owner_id, email_name, email_address)
*/
INSERT INTO email_account (email_owner_id, email_name, email_address)
VALUES :email_account! RETURNING email_account_id;

/* @name Insertemail_credential
*/
INSERT INTO email_credential (email_account_id)
VALUES (:email_account!) RETURNING email_account_id;

/* @name InsertImapOauth
   @param auth -> (email_credential_id, oauth_token, refresh_token)
*/
INSERT INTO imap_oauth (email_credential_id, oauth_token, refresh_token)
VALUES :auth! RETURNING email_credential_id;

/* @name InsertEmailMessage
   @param message ->  (title, first_line, sender_name, send_date, imap_uid)
*/
INSERT INTO email_message (title, first_line, sender_name, send_date, imap_uid)
VALUES :message! RETURNING email_message_id;
