import { IAddress, IUplaodAvatar } from '../common/common.interfaces';
import { IAccount } from '..';
import { Gender } from './user.enums';

export interface IUser {
  _id?: string;
  avatar?: IUplaodAvatar | string;
  first_name: string;
  last_name: string;
  gender: Gender;
  personal_number: string;
  phone: number;
  legal_address: IAddress;
  actual_address: IAddress;
  createdAt?: string;
  accounts?: IAccount[];
}
