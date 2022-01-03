import {createAction} from '@reduxjs/toolkit';
import {WalletInfo} from '../../../types/types';

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
export const filterFailed = createAction<string>('filterIncomeItemsFailed');

export const addNewCardSuccess = createAction<WalletInfo>('addCard');
export const addNewCardFailed = createAction<string>('addCardFailed');

export const deleteCardSuccess = createAction<number>('deleteCard');
export const deleteCardFailed = createAction<string>('deleteCardFailed');

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

export const addTransactionSuccess = createAction<WalletInfo>('addTransaction');
export const addTransactionFailed = createAction<string>(
  'addTransactionFailed',
);

export const deleteTransactionSuccess =
  createAction<WalletInfo>('deleteTransaction');
export const deleteTransactionFailed = createAction<string>(
  'deleteTransactionFailed',
);

export const addCorrectTransactionSuccess = createAction<WalletInfo>(
  'addCorrectTransaction',
);
export const addCorrectTransactionFailed = createAction<string>(
  'addCorrectTransactionFailed',
);
