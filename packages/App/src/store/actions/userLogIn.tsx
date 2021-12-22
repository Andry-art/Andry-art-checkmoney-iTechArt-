import {createAction} from '@reduxjs/toolkit';

export const userLogIn = createAction(
  'USER_LOG_IN',
  (email: string, password: string) => ({
    payload: {email, password},
  }),
);

export const userSignUp = createAction(
  'USER_SIGN_UP',
  (email: string, password: string) => ({
    payload: {email, password},
  }),
);
