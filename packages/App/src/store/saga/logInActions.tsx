import {createAction} from '@reduxjs/toolkit';

export const userLogInSuccess = createAction<undefined>('userLogInSuccess');
export const userLogInFailed = createAction<string>('userLogInFailed');
