import {createAction} from '@reduxjs/toolkit';

export const userLogIn = createAction(
  'USER_LOG_IN',
  (email: string, password: string) => ({
    payload: {email, password},
  }),
);
