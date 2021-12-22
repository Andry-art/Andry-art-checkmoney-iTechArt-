import {createAction} from '@reduxjs/toolkit';

export const userSignUp =
  createAction<{email: string; password: string}>('USER_SIGN_UP');
