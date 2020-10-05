import { state } from '@angular/animations';
import { createSelector } from '@ngrx/store';
import { IUser } from '../models';
import * as fromUser from './user/user.reducers';

export const selectFeature = (state: IUser) => state;

export const getEmailAddresses = createSelector(
  selectFeature,
  fromUser.getUser
);
