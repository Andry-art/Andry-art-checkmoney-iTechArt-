import {createReducer, PayloadAction} from '@reduxjs/toolkit';
import {
  userLogInSuccess,
  userLogInFailed,
  logOutActionSuccess,
} from '../actions/registration';

interface IRegistration {
  isLogIn: boolean;
  isLoading: boolean;
  error: string;
}

const initialState: IRegistration = {
  isLogIn: true,
  isLoading: false,
  error: '',
};

const userIsLogIn = createReducer<IRegistration>(initialState, builder => {
  builder
    .addCase('USER_LOG_IN', state => {
      state.isLoading = true;
      state.error = '';
      return state;
    })
    .addCase('USER_SIGN_UP', state => ({...state, isLoading: true}))
    .addCase(userLogInSuccess, state => {
      state.isLogIn = true;
      state.isLoading = false;
      state.error = '';
      return state;
    })
    .addCase(userLogInFailed, (state, action: PayloadAction<string>) => {
      state.isLogIn = false;
      state.isLoading = false;
      state.error = action.payload;
      return state;
    })
    .addCase(logOutActionSuccess, state => {
      state.isLogIn = false;
      state.error = '';
      return state;
    });
});

export default userIsLogIn;
