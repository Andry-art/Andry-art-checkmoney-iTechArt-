import {createAction} from '@reduxjs/toolkit';
import {WalletInfo} from '../../types/types';

export const getWalletItemsSuccess = createAction<Array<WalletInfo>>(
  'getWalletItemsSuccess',
);
export const getWalletItemsFailed = createAction<string>(
  'getWalletItemsFailed',
);

export const filterIncomeSuccess =
  createAction<{response: Array<WalletInfo>; page: number}>(
    'filterIncomeItems',
  );

export const filterExpensesSuccess = createAction<{
  response: Array<WalletInfo>;
  page: number;
}>('filterExpensesItems');

export const addNewCardSaga = createAction<WalletInfo>('addCard');

export const deleteCardSaga = createAction<number>('deleteCard');

export const monetaryMove = createAction<{
  key: number;
  amount: number;
  title?: string;
  type?: string;
  category?: string;
  date?: string;
  icon?: string;
  idCard?: number;
}>('monetaryMovements');

export const addTransactionSaga = createAction<WalletInfo>('addTransaction');

export const deleteTransactionSaga =
  createAction<WalletInfo>('deleteTransaction');

export const addCorrectTransaction = createAction<WalletInfo>(
  'addCorrectTransaction',
);
