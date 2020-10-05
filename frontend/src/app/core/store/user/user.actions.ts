import { Action } from '@ngrx/store';
import { IAccount, IUser } from 'src/app/core/models';

export enum UserActions {
  SIGN_IN = '[USER] SIGN_IN',
  GET_USER = '[USER] GET_USER',
  SET_USER = '[USER] SET_USER',
  UPDATE_USER = '[USER] UPDATE_USER',
  SIGN_OUT = '[USER] REMOVE_USER',

  SET_ACCOUNTS = '[ACCOUNT] SET_ACCOUNTS',
  ADD_ACCOUNT = '[ACCOUNT] ADD_ACCOUNT',
  REMOVE_ACCOUNT = '[ACCOUNT] REMOVE_ACCOUNT',
  UPDATE_ACCOUNT = '[ACCOUNT] UPDATE_ACCOUNT',
}

export class GetUser implements Action {
  public readonly type = UserActions.GET_USER;
  constructor(public payload: string) {}
}

export class SetUser implements Action {
  public readonly type = UserActions.SET_USER;
  constructor(public payload: IUser) {}
}

export class UpdateUser implements Action {
  public readonly type = UserActions.UPDATE_USER;
  constructor(public payload: IUser) {}
}

export class SignIn implements Action {
  public readonly type = UserActions.SIGN_IN;
  constructor(public payload: IUser) {}
}

export class SignOut implements Action {
  public readonly type = UserActions.SIGN_OUT;
}

export class SetAccounts implements Action {
  public readonly type = UserActions.SET_ACCOUNTS;
  constructor(public payload: IAccount[]) {}
}

export class AddAccount implements Action {
  public readonly type = UserActions.ADD_ACCOUNT;
  constructor(public payload: IAccount) {}
}

export class RemoveAccount implements Action {
  public readonly type = UserActions.REMOVE_ACCOUNT;
  constructor(public payload: string) {}
}

export class UpdateAccount implements Action {
  public readonly type = UserActions.UPDATE_ACCOUNT;
  constructor(public payload: IAccount) {}
}

export type UserActionsUnion =
  | GetUser
  | SetUser
  | UpdateUser
  | SignIn
  | SignOut
  | AddAccount
  | SetAccounts
  | RemoveAccount
  | UpdateAccount;
