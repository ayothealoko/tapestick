/** Types generated for queries found in "app/models/queries/auth.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'InsertUserAuth' parameters type */
export interface IInsertUserAuthParams {
  user: {
    user_first_name: string,
    user_last_name: string,
    email: string,
    password_hash: string,
    is_active: boolean,
    account_id: string
  };
}

/** 'InsertUserAuth' return type */
export interface IInsertUserAuthResult {
  user_auth_id: string;
}

/** 'InsertUserAuth' query type */
export interface IInsertUserAuthQuery {
  params: IInsertUserAuthParams;
  result: IInsertUserAuthResult;
}

const insertUserAuthIR: any = {"usedParamSet":{"user":true},"params":[{"name":"user","required":true,"transform":{"type":"pick_tuple","keys":[{"name":"user_first_name","required":true},{"name":"user_last_name","required":true},{"name":"email","required":true},{"name":"password_hash","required":true},{"name":"is_active","required":true},{"name":"account_id","required":true}]},"locs":[{"a":108,"b":113}]}],"statement":"INSERT INTO user_auth (user_first_name, user_last_name, email, password_hash, is_active, account_id)\nVALUES :user! RETURNING user_auth_id"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO user_auth (user_first_name, user_last_name, email, password_hash, is_active, account_id)
 * VALUES :user! RETURNING user_auth_id
 * ```
 */
export const insertUserAuth = new PreparedQuery<IInsertUserAuthParams,IInsertUserAuthResult>(insertUserAuthIR);


/** 'InsertUserSignupEmailConfirm' parameters type */
export interface IInsertUserSignupEmailConfirmParams {
  user_auth_id: string;
}

/** 'InsertUserSignupEmailConfirm' return type */
export interface IInsertUserSignupEmailConfirmResult {
  user_signup_email_confirm_id: string;
}

/** 'InsertUserSignupEmailConfirm' query type */
export interface IInsertUserSignupEmailConfirmQuery {
  params: IInsertUserSignupEmailConfirmParams;
  result: IInsertUserSignupEmailConfirmResult;
}

const insertUserSignupEmailConfirmIR: any = {"usedParamSet":{"user_auth_id":true},"params":[{"name":"user_auth_id","required":true,"transform":{"type":"scalar"},"locs":[{"a":61,"b":74}]}],"statement":"INSERT INTO user_signup_email_confirm (user_auth_id)\nVALUES (:user_auth_id!) RETURNING user_signup_email_confirm_id"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO user_signup_email_confirm (user_auth_id)
 * VALUES (:user_auth_id!) RETURNING user_signup_email_confirm_id
 * ```
 */
export const insertUserSignupEmailConfirm = new PreparedQuery<IInsertUserSignupEmailConfirmParams,IInsertUserSignupEmailConfirmResult>(insertUserSignupEmailConfirmIR);


/** 'GetUserAndHashlinkFromUserSignupEmailConfirmId' parameters type */
export interface IGetUserAndHashlinkFromUserSignupEmailConfirmIdParams {
  user_signup_email_confirm_id: string;
}

/** 'GetUserAndHashlinkFromUserSignupEmailConfirmId' return type */
export interface IGetUserAndHashlinkFromUserSignupEmailConfirmIdResult {
  email: string;
  hash_link: string;
  user_first_name: string;
  user_last_name: string;
}

/** 'GetUserAndHashlinkFromUserSignupEmailConfirmId' query type */
export interface IGetUserAndHashlinkFromUserSignupEmailConfirmIdQuery {
  params: IGetUserAndHashlinkFromUserSignupEmailConfirmIdParams;
  result: IGetUserAndHashlinkFromUserSignupEmailConfirmIdResult;
}

const getUserAndHashlinkFromUserSignupEmailConfirmIdIR: any = {"usedParamSet":{"user_signup_email_confirm_id":true},"params":[{"name":"user_signup_email_confirm_id","required":true,"transform":{"type":"scalar"},"locs":[{"a":209,"b":238}]}],"statement":"SELECT a.\"user_first_name\", a.\"user_last_name\", b.\"hash_link\", a.\"email\"\nFROM user_auth a\nINNER JOIN user_signup_email_confirm b\n      on a.user_auth_id = b.user_auth_id\nWHERE b.user_signup_email_confirm_id = :user_signup_email_confirm_id!\n      AND b.created_on > NOW() - INTERVAL '3 hours'\n      AND b.created_on < NOW() + INTERVAL '3 hours'"};

/**
 * Query generated from SQL:
 * ```
 * SELECT a."user_first_name", a."user_last_name", b."hash_link", a."email"
 * FROM user_auth a
 * INNER JOIN user_signup_email_confirm b
 *       on a.user_auth_id = b.user_auth_id
 * WHERE b.user_signup_email_confirm_id = :user_signup_email_confirm_id!
 *       AND b.created_on > NOW() - INTERVAL '3 hours'
 *       AND b.created_on < NOW() + INTERVAL '3 hours'
 * ```
 */
export const getUserAndHashlinkFromUserSignupEmailConfirmId = new PreparedQuery<IGetUserAndHashlinkFromUserSignupEmailConfirmIdParams,IGetUserAndHashlinkFromUserSignupEmailConfirmIdResult>(getUserAndHashlinkFromUserSignupEmailConfirmIdIR);


/** 'GetUserByEmail' parameters type */
export interface IGetUserByEmailParams {
  user_email: string;
}

/** 'GetUserByEmail' return type */
export interface IGetUserByEmailResult {
  account_id: string;
  created_on: Date;
  email: string;
  is_active: boolean;
  last_modified: Date;
  password_hash: string;
  user_auth_id: string;
  user_first_name: string;
  user_last_name: string;
}

/** 'GetUserByEmail' query type */
export interface IGetUserByEmailQuery {
  params: IGetUserByEmailParams;
  result: IGetUserByEmailResult;
}

const getUserByEmailIR: any = {"usedParamSet":{"user_email":true},"params":[{"name":"user_email","required":true,"transform":{"type":"scalar"},"locs":[{"a":158,"b":169}]}],"statement":"SELECT user_auth_id, user_first_name, user_last_name, email, password_hash, is_active, created_on, last_modified, account_id\nFROM user_auth a\nWHERE a.email = :user_email!"};

/**
 * Query generated from SQL:
 * ```
 * SELECT user_auth_id, user_first_name, user_last_name, email, password_hash, is_active, created_on, last_modified, account_id
 * FROM user_auth a
 * WHERE a.email = :user_email!
 * ```
 */
export const getUserByEmail = new PreparedQuery<IGetUserByEmailParams,IGetUserByEmailResult>(getUserByEmailIR);


/** 'GetUserById' parameters type */
export interface IGetUserByIdParams {
  user_auth_id: string;
}

/** 'GetUserById' return type */
export interface IGetUserByIdResult {
  created_on: Date;
  email: string;
  is_active: boolean;
  last_modified: Date;
  password_hash: string;
  user_auth_id: string;
  user_first_name: string;
  user_last_name: string;
}

/** 'GetUserById' query type */
export interface IGetUserByIdQuery {
  params: IGetUserByIdParams;
  result: IGetUserByIdResult;
}

const getUserByIdIR: any = {"usedParamSet":{"user_auth_id":true},"params":[{"name":"user_auth_id","required":true,"transform":{"type":"scalar"},"locs":[{"a":153,"b":166}]}],"statement":"SELECT user_auth_id, user_first_name, user_last_name, email, password_hash, is_active, created_on, last_modified\nFROM user_auth a\nWHERE a.user_auth_id = :user_auth_id!"};

/**
 * Query generated from SQL:
 * ```
 * SELECT user_auth_id, user_first_name, user_last_name, email, password_hash, is_active, created_on, last_modified
 * FROM user_auth a
 * WHERE a.user_auth_id = :user_auth_id!
 * ```
 */
export const getUserById = new PreparedQuery<IGetUserByIdParams,IGetUserByIdResult>(getUserByIdIR);


