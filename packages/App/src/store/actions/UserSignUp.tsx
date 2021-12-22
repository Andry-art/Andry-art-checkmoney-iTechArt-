import {createAction} from '@reduxjs/toolkit';

export const userSignUp = createAction(
  'USER_SIGN_UP',
  (email: string, password: string) => ({
    payload: {email, password},
  }),
);
