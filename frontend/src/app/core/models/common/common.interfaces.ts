import { IUser } from '../user/user.interfaces';

export interface IAddress {
  country: string;
  city: string;
  address: string;
}

export interface IUplaodAvatar {
  avatarUrl?: string;
  file: File;
}
export interface IGetUsers {
  users: IUser[];
  users_amount: number;
}
