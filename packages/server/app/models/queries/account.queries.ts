/** Types generated for queries found in "app/models/queries/account.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'InsertAccount' parameters type */
export interface IInsertAccountParams {
  account: {
    account_name: string
  };
}

/** 'InsertAccount' return type */
export interface IInsertAccountResult {
  account_id: string;
}

/** 'InsertAccount' query type */
export interface IInsertAccountQuery {
  params: IInsertAccountParams;
  result: IInsertAccountResult;
}

const insertAccountIR: any = {"usedParamSet":{"account":true},"params":[{"name":"account","required":true,"transform":{"type":"pick_tuple","keys":[{"name":"account_name","required":true}]},"locs":[{"a":42,"b":50}]}],"statement":"INSERT INTO account (account_name)\nVALUES :account! RETURNING account_id"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO account (account_name)
 * VALUES :account! RETURNING account_id
 * ```
 */
export const insertAccount = new PreparedQuery<IInsertAccountParams,IInsertAccountResult>(insertAccountIR);


