import { AccountType, Currency } from './account.enums';

export interface IAccount {
  _id?: string;
  user_id?: string;
  account_type: AccountType[];
  currency: Currency[];
  is_active: boolean;
}
