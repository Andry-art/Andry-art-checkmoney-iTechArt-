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
