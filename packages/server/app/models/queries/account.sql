/* @name InsertAccount
   @param account ->  (account_name!)
*/

INSERT INTO account (account_name)
VALUES :account! RETURNING account_id ;
