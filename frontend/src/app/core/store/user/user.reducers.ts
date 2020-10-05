import { IUserState } from '../interfaces';
import { UserActions, UserActionsUnion } from './user.actions';

export const initialState: IUserState = {
  user: null,
};

export function reducer(
  state: IUserState = initialState,
  action: UserActionsUnion
): IUserState {
  switch (action.type) {
    case UserActions.SET_ACCOUNTS: {
      const userCopy = Object.assign({}, state.user);
      userCopy.accounts = action.payload;

      return {
        ...state,
        user: userCopy,
      };
    }
    case UserActions.ADD_ACCOUNT: {
      const accounts = state.user.accounts
        ? [...state.user.accounts, action.payload]
        : [action.payload];
      const userCopy = Object.assign({}, state.user);
      userCopy.accounts = accounts;

      return {
        ...state,
        user: userCopy,
      };
    }
    case UserActions.UPDATE_ACCOUNT: {
      const accounts = [...state.user.accounts];
      const idx = accounts.findIndex((el) => el._id === action.payload._id);
      const userCopy = Object.assign({}, state.user);

      if (idx > -1) {
        accounts[idx] = action.payload;
        userCopy.accounts = accounts;
      }

      return {
        ...state,
        user: userCopy,
      };
    }
    case UserActions.REMOVE_ACCOUNT: {
      const accounts = [...state.user.accounts];
      const userCopy = Object.assign({}, state.user);

      userCopy.accounts = accounts.filter((el) => el._id !== action.payload);

      return {
        ...state,
        user: userCopy,
      };
    }
    case UserActions.UPDATE_USER:
    case UserActions.SET_USER: {
      if (action.payload) {
        const user = Object.assign({}, action.payload);
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
        }
        return {
          ...state,
          user,
        };
      }
      return {
        ...state,
      };
    }
    case UserActions.SIGN_OUT: {
      return {
        ...state,
        user: null,
      };
    }
    default:
      return state;
  }
}

export const getUser = (state: IUserState) => state.user;
