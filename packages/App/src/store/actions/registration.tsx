import {createAction} from '@reduxjs/toolkit';

export const userLogIn =
  createAction<{email: string; password: string}>('USER_LOG_IN');

export const userSignUp =
  createAction<{email: string; password: string}>('USER_SIGN_UP');
