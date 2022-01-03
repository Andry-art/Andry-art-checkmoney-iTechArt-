import {createAction} from '@reduxjs/toolkit';
import {WalletInfo} from '../../types/types';

export const getAllItemWallet = createAction<undefined>('GET_WALLET_ITEMS');

export const filterInComeRequest = createAction<number>('FILTER_INCOME');

export const filterExpensesRequest = createAction<number>('FILTER_EXPENSES');

export const addNewCardRequest =
  createAction<{cardName: string; amount: string; color: string; key: number}>(
    'ADD_CARD',
  );

export const deleteWalletCardRequest = createAction<number>('DELETE_CARD');

export const cardMonetaryMove =
  createAction<{key: number; amount: number; title: string}>(
    'CARD_MONETARY_MOVE',
  );

export const addTransactionRequest = createAction<{
  item: WalletInfo;
  transaction: {
    keyTransaction: number;
    type: string;
    amountTransaction: number;
    category: string;
    icon: string;
    date: string;
  };
}>('ADD_TRANSACTION');

export const deleteTransactionRequest = createAction<{
  item: WalletInfo;
  transactionKey: {keyTransaction: number; amount: number; type: string};
}>('DELETE_TRANSACTION');

export const correctTransactionInfo = createAction<{
  key: number;
  amount: number;
  category: string;
  date: string;
  type: string;
  icon: string;
  idCard: number;
}>('CORRECT_TRANSACTION_INFO');

export const addCorrectTransactionRequest = createAction<{
  item: WalletInfo;
  correctedTransaction: {
    keyTransaction: number;
    amountTransaction: number;
    category: string;
    date: string;
    type: string;
    icon: string;
  };
  difference: number;
}>('CORRECT_TRANSACTION');

// export const userSignUp =
//   createAction<{email: string; password: string}>('USER_SIGN_UP');
