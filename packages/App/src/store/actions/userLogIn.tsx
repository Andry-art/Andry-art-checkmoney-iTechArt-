import {createAction} from '@reduxjs/toolkit';

export const userLogIn =
  createAction<{email: string; password: string}>('USER_LOG_IN');
