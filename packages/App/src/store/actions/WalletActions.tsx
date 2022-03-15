import {createAction} from '@reduxjs/toolkit';
import {DebitInfo, TransactionRequest, WalletInfo} from '../../types/types';

export const getAllItemWallet = createAction<undefined>('GET_WALLET_ITEMS');
export const getWalletItemsSuccess = createAction<Array<WalletInfo>>(
  'getWalletItemsSuccess',
);
export const getWalletItemsFailed = createAction<string>(
  'getWalletItemsFailed',
);

export const addNewCardRequest = createAction<{
  cardName: string;
  amount: number;
  color: Array<string>;
  key: number;
}>('ADD_CARD');
export const addNewCardSuccess = createAction<WalletInfo>('addCard');
export const addNewCardFailed = createAction<string>('addCardFailed');

export const deleteWalletCardRequest = createAction<number>('DELETE_CARD');
export const deleteCardSuccess = createAction<number>('deleteCard');
export const deleteCardFailed = createAction<string>('deleteCardFailed');

export const cardMonetaryMove =
  createAction<{key: number; amount: number; title: string}>(
    'CARD_MONETARY_MOVE',
  );

export const addTransactionRequest = createAction<{
  item: WalletInfo;
  transaction: TransactionRequest | DebitInfo;
}>('ADD_TRANSACTION');
export const addTransactionSuccess = createAction<WalletInfo>('addTransaction');
export const addTransactionFailed = createAction<string>(
  'addTransactionFailed',
);

export const deleteTransactionRequest = createAction<{
  item: WalletInfo;
  transactionKey: {
    keyTransaction: number;
    amountTransaction: number;
    type: string;
  };
}>('DELETE_TRANSACTION');
export const deleteTransactionSuccess =
  createAction<WalletInfo>('deleteTransaction');
export const deleteTransactionFailed = createAction<string>(
  'deleteTransactionFailed',
);

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
export const addCorrectTransactionSuccess = createAction<WalletInfo>(
  'addCorrectTransaction',
);
export const addCorrectTransactionFailed = createAction<string>(
  'addCorrectTransactionFailed',
);

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

export const cleanErrorsWallet = createAction<undefined>('cleanErrors');
