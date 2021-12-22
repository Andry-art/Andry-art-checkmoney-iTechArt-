import {createReducer, PayloadAction} from '@reduxjs/toolkit';
import {
  userLogInSuccess,
  userLogInFailed,
  userLogInRequest,
} from '../saga/userLogIn';

interface IRegistration {
  isLogIn: boolean;
  isLoading: boolean;
  error: string;
}

const initialState: IRegistration = {
  isLogIn: false,
  isLoading: false,
  error: '',
};

const userIsLogIn = createReducer<IRegistration>(initialState, builder => {
  builder
    .addCase(userLogInRequest, state => ({...state, isLoading: true}))
    .addCase(userLogInSuccess, state => ({
      ...state,
      isLogIn: true,
      isLoading: false,
    }))
    .addCase(userLogInFailed, (state, action: PayloadAction<string>) => ({
      ...state,
      isLogIn: false,
      isLoading: false,
      error: action.payload,
    }));
});

export default userIsLogIn;
