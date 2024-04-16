/** Types generated for queries found in "app/models/queries/email.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

export type DateOrString = Date | string;

/** 'GetEmailOwnerById' parameters type */
export interface IGetEmailOwnerByIdParams {
  email_owner_id: string;
}

/** 'GetEmailOwnerById' return type */
export interface IGetEmailOwnerByIdResult {
  email_owner_id: string;
  is_person: boolean;
}

/** 'GetEmailOwnerById' query type */
export interface IGetEmailOwnerByIdQuery {
  params: IGetEmailOwnerByIdParams;
  result: IGetEmailOwnerByIdResult;
}

const getEmailOwnerByIdIR: any = {"usedParamSet":{"email_owner_id":true},"params":[{"name":"email_owner_id","required":true,"transform":{"type":"scalar"},"locs":[{"a":73,"b":88}]}],"statement":"SELECT email_owner_id, is_person\nFROM email_owner\nWHERE email_owner_id = :email_owner_id!"};

/**
 * Query generated from SQL:
 * ```
 * SELECT email_owner_id, is_person
 * FROM email_owner
 * WHERE email_owner_id = :email_owner_id!
 * ```
 */
export const getEmailOwnerById = new PreparedQuery<IGetEmailOwnerByIdParams,IGetEmailOwnerByIdResult>(getEmailOwnerByIdIR);


/** 'GetEmailOwnerByAccountId' parameters type */
export interface IGetEmailOwnerByAccountIdParams {
  account_id: string;
}

/** 'GetEmailOwnerByAccountId' return type */
export interface IGetEmailOwnerByAccountIdResult {
  account_id: string;
  email_owner_id: string;
}

/** 'GetEmailOwnerByAccountId' query type */
export interface IGetEmailOwnerByAccountIdQuery {
  params: IGetEmailOwnerByAccountIdParams;
  result: IGetEmailOwnerByAccountIdResult;
}

const getEmailOwnerByAccountIdIR: any = {"usedParamSet":{"account_id":true},"params":[{"name":"account_id","required":true,"transform":{"type":"scalar"},"locs":[{"a":82,"b":93}]}],"statement":"SELECT email_owner_id, account_id\nFROM email_owner_sub_account\nWHERE account_id = :account_id!"};

/**
 * Query generated from SQL:
 * ```
 * SELECT email_owner_id, account_id
 * FROM email_owner_sub_account
 * WHERE account_id = :account_id!
 * ```
 */
export const getEmailOwnerByAccountId = new PreparedQuery<IGetEmailOwnerByAccountIdParams,IGetEmailOwnerByAccountIdResult>(getEmailOwnerByAccountIdIR);


/** 'GetEmailOwnerSubAccountById' parameters type */
export interface IGetEmailOwnerSubAccountByIdParams {
  email_owner_id: string;
}

/** 'GetEmailOwnerSubAccountById' return type */
export interface IGetEmailOwnerSubAccountByIdResult {
  account_id: string;
  email_owner_id: string;
}

/** 'GetEmailOwnerSubAccountById' query type */
export interface IGetEmailOwnerSubAccountByIdQuery {
  params: IGetEmailOwnerSubAccountByIdParams;
  result: IGetEmailOwnerSubAccountByIdResult;
}

const getEmailOwnerSubAccountByIdIR: any = {"usedParamSet":{"email_owner_id":true},"params":[{"name":"email_owner_id","required":true,"transform":{"type":"scalar"},"locs":[{"a":86,"b":101}]}],"statement":"SELECT email_owner_id, account_id\nFROM email_owner_sub_account\nWHERE email_owner_id = :email_owner_id!"};

/**
 * Query generated from SQL:
 * ```
 * SELECT email_owner_id, account_id
 * FROM email_owner_sub_account
 * WHERE email_owner_id = :email_owner_id!
 * ```
 */
export const getEmailOwnerSubAccountById = new PreparedQuery<IGetEmailOwnerSubAccountByIdParams,IGetEmailOwnerSubAccountByIdResult>(getEmailOwnerSubAccountByIdIR);


/** 'GetEmailOwnerByPersonId' parameters type */
export interface IGetEmailOwnerByPersonIdParams {
  user_auth_id: string;
}

/** 'GetEmailOwnerByPersonId' return type */
export interface IGetEmailOwnerByPersonIdResult {
  email_owner_id: string;
  user_auth_id: string;
}

/** 'GetEmailOwnerByPersonId' query type */
export interface IGetEmailOwnerByPersonIdQuery {
  params: IGetEmailOwnerByPersonIdParams;
  result: IGetEmailOwnerByPersonIdResult;
}

const getEmailOwnerByPersonIdIR: any = {"usedParamSet":{"user_auth_id":true},"params":[{"name":"user_auth_id","required":true,"transform":{"type":"scalar"},"locs":[{"a":85,"b":98}]}],"statement":"SELECT email_owner_id, user_auth_id\nFROM email_owner_sub_person\nWHERE user_auth_id = :user_auth_id!"};

/**
 * Query generated from SQL:
 * ```
 * SELECT email_owner_id, user_auth_id
 * FROM email_owner_sub_person
 * WHERE user_auth_id = :user_auth_id!
 * ```
 */
export const getEmailOwnerByPersonId = new PreparedQuery<IGetEmailOwnerByPersonIdParams,IGetEmailOwnerByPersonIdResult>(getEmailOwnerByPersonIdIR);


/** 'GetEmailOwnerSubPersonById' parameters type */
export interface IGetEmailOwnerSubPersonByIdParams {
  email_owner_id: string;
}

/** 'GetEmailOwnerSubPersonById' return type */
export interface IGetEmailOwnerSubPersonByIdResult {
  email_owner_id: string;
  user_auth_id: string;
}

/** 'GetEmailOwnerSubPersonById' query type */
export interface IGetEmailOwnerSubPersonByIdQuery {
  params: IGetEmailOwnerSubPersonByIdParams;
  result: IGetEmailOwnerSubPersonByIdResult;
}

const getEmailOwnerSubPersonByIdIR: any = {"usedParamSet":{"email_owner_id":true},"params":[{"name":"email_owner_id","required":true,"transform":{"type":"scalar"},"locs":[{"a":87,"b":102}]}],"statement":"SELECT email_owner_id, user_auth_id\nFROM email_owner_sub_person\nWHERE email_owner_id = :email_owner_id!"};

/**
 * Query generated from SQL:
 * ```
 * SELECT email_owner_id, user_auth_id
 * FROM email_owner_sub_person
 * WHERE email_owner_id = :email_owner_id!
 * ```
 */
export const getEmailOwnerSubPersonById = new PreparedQuery<IGetEmailOwnerSubPersonByIdParams,IGetEmailOwnerSubPersonByIdResult>(getEmailOwnerSubPersonByIdIR);


/** 'InsertEmailOwner' parameters type */
export interface IInsertEmailOwnerParams {
  is_person: boolean;
}

/** 'InsertEmailOwner' return type */
export interface IInsertEmailOwnerResult {
  email_owner_id: string;
}

/** 'InsertEmailOwner' query type */
export interface IInsertEmailOwnerQuery {
  params: IInsertEmailOwnerParams;
  result: IInsertEmailOwnerResult;
}

const insertEmailOwnerIR: any = {"usedParamSet":{"is_person":true},"params":[{"name":"is_person","required":true,"transform":{"type":"scalar"},"locs":[{"a":44,"b":54}]}],"statement":"INSERT INTO email_owner (is_person)\nVALUES (:is_person!) RETURNING email_owner_id"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO email_owner (is_person)
 * VALUES (:is_person!) RETURNING email_owner_id
 * ```
 */
export const insertEmailOwner = new PreparedQuery<IInsertEmailOwnerParams,IInsertEmailOwnerResult>(insertEmailOwnerIR);


/** 'InsertEmailOwnerSubAccount' parameters type */
export interface IInsertEmailOwnerSubAccountParams {
  sub_person: {
    owner: string | null | void,
    owner_sub_id: string | null | void
  };
}

/** 'InsertEmailOwnerSubAccount' return type */
export interface IInsertEmailOwnerSubAccountResult {
  email_owner_id: string;
}

/** 'InsertEmailOwnerSubAccount' query type */
export interface IInsertEmailOwnerSubAccountQuery {
  params: IInsertEmailOwnerSubAccountParams;
  result: IInsertEmailOwnerSubAccountResult;
}

const insertEmailOwnerSubAccountIR: any = {"usedParamSet":{"sub_person":true},"params":[{"name":"sub_person","required":true,"transform":{"type":"pick_tuple","keys":[{"name":"owner","required":false},{"name":"owner_sub_id","required":false}]},"locs":[{"a":72,"b":83}]}],"statement":"INSERT INTO email_owner_sub_account (email_owner_id, account_id)\nVALUES :sub_person!  RETURNING email_owner_id"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO email_owner_sub_account (email_owner_id, account_id)
 * VALUES :sub_person!  RETURNING email_owner_id
 * ```
 */
export const insertEmailOwnerSubAccount = new PreparedQuery<IInsertEmailOwnerSubAccountParams,IInsertEmailOwnerSubAccountResult>(insertEmailOwnerSubAccountIR);


/** 'InsetEmailOwnerSubPerson' parameters type */
export interface IInsetEmailOwnerSubPersonParams {
  sub_person: {
    owner: string | null | void,
    owner_sub_id: string | null | void
  };
}

/** 'InsetEmailOwnerSubPerson' return type */
export interface IInsetEmailOwnerSubPersonResult {
  email_owner_id: string;
}

/** 'InsetEmailOwnerSubPerson' query type */
export interface IInsetEmailOwnerSubPersonQuery {
  params: IInsetEmailOwnerSubPersonParams;
  result: IInsetEmailOwnerSubPersonResult;
}

const insetEmailOwnerSubPersonIR: any = {"usedParamSet":{"sub_person":true},"params":[{"name":"sub_person","required":false,"transform":{"type":"pick_tuple","keys":[{"name":"owner","required":false},{"name":"owner_sub_id","required":false}]},"locs":[{"a":73,"b":83}]}],"statement":"INSERT INTO email_owner_sub_person (email_owner_id, user_auth_id)\nVALUES :sub_person RETURNING email_owner_id"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO email_owner_sub_person (email_owner_id, user_auth_id)
 * VALUES :sub_person RETURNING email_owner_id
 * ```
 */
export const insetEmailOwnerSubPerson = new PreparedQuery<IInsetEmailOwnerSubPersonParams,IInsetEmailOwnerSubPersonResult>(insetEmailOwnerSubPersonIR);


/** 'InsertEmailAccount' parameters type */
export interface IInsertEmailAccountParams {
  email_account: {
    email_owner_id: string | null | void,
    email_name: string | null | void,
    email_address: string | null | void
  };
}

/** 'InsertEmailAccount' return type */
export interface IInsertEmailAccountResult {
  email_account_id: string;
}

/** 'InsertEmailAccount' query type */
export interface IInsertEmailAccountQuery {
  params: IInsertEmailAccountParams;
  result: IInsertEmailAccountResult;
}

const insertEmailAccountIR: any = {"usedParamSet":{"email_account":true},"params":[{"name":"email_account","required":true,"transform":{"type":"pick_tuple","keys":[{"name":"email_owner_id","required":false},{"name":"email_name","required":false},{"name":"email_address","required":false}]},"locs":[{"a":77,"b":91}]}],"statement":"INSERT INTO email_account (email_owner_id, email_name, email_address)\nVALUES :email_account! RETURNING email_account_id"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO email_account (email_owner_id, email_name, email_address)
 * VALUES :email_account! RETURNING email_account_id
 * ```
 */
export const insertEmailAccount = new PreparedQuery<IInsertEmailAccountParams,IInsertEmailAccountResult>(insertEmailAccountIR);


/** 'InsertemailCredential' parameters type */
export interface IInsertemailCredentialParams {
  email_account: string;
}

/** 'InsertemailCredential' return type */
export interface IInsertemailCredentialResult {
  email_account_id: string;
}

/** 'InsertemailCredential' query type */
export interface IInsertemailCredentialQuery {
  params: IInsertemailCredentialParams;
  result: IInsertemailCredentialResult;
}

const insertemailCredentialIR: any = {"usedParamSet":{"email_account":true},"params":[{"name":"email_account","required":true,"transform":{"type":"scalar"},"locs":[{"a":56,"b":70}]}],"statement":"INSERT INTO email_credential (email_account_id)\nVALUES (:email_account!) RETURNING email_account_id"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO email_credential (email_account_id)
 * VALUES (:email_account!) RETURNING email_account_id
 * ```
 */
export const insertemailCredential = new PreparedQuery<IInsertemailCredentialParams,IInsertemailCredentialResult>(insertemailCredentialIR);


/** 'InsertImapOauth' parameters type */
export interface IInsertImapOauthParams {
  auth: {
    email_credential_id: string | null | void,
    oauth_token: string | null | void,
    refresh_token: string | null | void
  };
}

/** 'InsertImapOauth' return type */
export interface IInsertImapOauthResult {
  email_credential_id: string;
}

/** 'InsertImapOauth' query type */
export interface IInsertImapOauthQuery {
  params: IInsertImapOauthParams;
  result: IInsertImapOauthResult;
}

const insertImapOauthIR: any = {"usedParamSet":{"auth":true},"params":[{"name":"auth","required":true,"transform":{"type":"pick_tuple","keys":[{"name":"email_credential_id","required":false},{"name":"oauth_token","required":false},{"name":"refresh_token","required":false}]},"locs":[{"a":80,"b":85}]}],"statement":"INSERT INTO imap_oauth (email_credential_id, oauth_token, refresh_token)\nVALUES :auth! RETURNING email_credential_id"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO imap_oauth (email_credential_id, oauth_token, refresh_token)
 * VALUES :auth! RETURNING email_credential_id
 * ```
 */
export const insertImapOauth = new PreparedQuery<IInsertImapOauthParams,IInsertImapOauthResult>(insertImapOauthIR);


/** 'InsertEmailMessage' parameters type */
export interface IInsertEmailMessageParams {
  message: {
    title: string | null | void,
    first_line: string | null | void,
    sender_name: string | null | void,
    send_date: DateOrString | null | void,
    imap_uid: string | null | void
  };
}

/** 'InsertEmailMessage' return type */
export interface IInsertEmailMessageResult {
  email_message_id: string;
}

/** 'InsertEmailMessage' query type */
export interface IInsertEmailMessageQuery {
  params: IInsertEmailMessageParams;
  result: IInsertEmailMessageResult;
}

const insertEmailMessageIR: any = {"usedParamSet":{"message":true},"params":[{"name":"message","required":true,"transform":{"type":"pick_tuple","keys":[{"name":"title","required":false},{"name":"first_line","required":false},{"name":"sender_name","required":false},{"name":"send_date","required":false},{"name":"imap_uid","required":false}]},"locs":[{"a":87,"b":95}]}],"statement":"INSERT INTO email_message (title, first_line, sender_name, send_date, imap_uid)\nVALUES :message! RETURNING email_message_id"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO email_message (title, first_line, sender_name, send_date, imap_uid)
 * VALUES :message! RETURNING email_message_id
 * ```
 */
export const insertEmailMessage = new PreparedQuery<IInsertEmailMessageParams,IInsertEmailMessageResult>(insertEmailMessageIR);


