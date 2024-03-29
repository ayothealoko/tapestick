/* @name InsertUserAuth
   @param user ->  (user_first_name!, user_last_name!, email!, password_hash!, is_active!)
*/
INSERT INTO user_auth (user_first_name, user_last_name, email, password_hash, is_active)
VALUES :user! RETURNING user_auth_id ;

/* @name InsertUserSignupEmailConfirm
*/
INSERT INTO user_signup_email_confirm (user_auth_id)
VALUES (:user_auth_id!) RETURNING user_signup_email_confirm_id ;

/* @name GetUserAndHashlinkFromUserSignupEmailConfirmId
*/
SELECT a."user_first_name", a."user_last_name", b."hash_link", a."email"
FROM user_auth a
INNER JOIN user_signup_email_confirm b
      on a.user_auth_id = b.user_auth_id
WHERE b.user_signup_email_confirm_id = :user_signup_email_confirm_id!
      AND b.created_on > NOW() - INTERVAL '3 hours'
      AND b.created_on < NOW() + INTERVAL '3 hours';



/* @name GetUserByEmail
*/
SELECT user_auth_id, user_first_name, user_last_name, email, password_hash, is_active, created_on, last_modified
FROM user_auth a
WHERE a.email = :user_email!;

/* @name GetUserById
*/
SELECT user_auth_id, user_first_name, user_last_name, email, password_hash, is_active, created_on, last_modified
FROM user_auth a
WHERE a.user_auth_id = :user_auth_id!;
