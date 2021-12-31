import {createAction} from '@reduxjs/toolkit';
import {WalletInfo} from '../../types/types';

export const getAllItemWallet = createAction<undefined>('GET_WALLET_ITEMS');

export const filterInComeItems = createAction<number>('FILTER_INCOME');

export const filterExpensesItems = createAction<number>('FILTER_EXPENSES');

export const addNewCard =
  createAction<{cardName: string; amount: string; color: string; key: number}>(
    'ADD_CARD',
  );

export const deleteWalletCard = createAction<number>('DELETE_CARD');

export const cardMonetaryMove =
  createAction<{key: number; amount: number; title: string}>(
    'CARD_MONETARY_MOVE',
  );

export const addTransactionAction = createAction<{
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

export const deleteTransactionAction = createAction<{
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

export const getCorrectTransaction = createAction<{
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
