import {createAction} from '@reduxjs/toolkit';

export const getAllItemWallet = createAction<undefined>('GET_WALLET_ITEMS');

export const filterInComeItems = createAction<number>('FILTER_INCOME');

export const filterExpensesItems = createAction<number>('FILTER_EXPENSES');

// export const userSignUp =
//   createAction<{email: string; password: string}>('USER_SIGN_UP');
