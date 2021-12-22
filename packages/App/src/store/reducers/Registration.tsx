import {createReducer} from '@reduxjs/toolkit';
import {
  userLogInSuccess,
  userLogInFailed,
  userLogInRequest,
} from '../saga/userLogIn';

const initialState = {
  isLogIn: false,
  isLoading: false,
  error: '',
};

const userIsLogIn = createReducer(initialState, builder => {
  builder
    .addCase(userLogInRequest, state => ({...state, isLoading: true}))
    .addCase(userLogInSuccess, state => ({
      ...state,
      isLogIn: true,
      isLoading: false,
    }))
    .addCase(userLogInFailed, (state, action) => ({
      ...state,
      isLogIn: false,
      isLoading: false,
      error: action.payload,
    }));
});

export default userIsLogIn;
