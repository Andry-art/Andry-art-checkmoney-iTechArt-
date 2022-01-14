import {createDraftSafeSelector} from '@reduxjs/toolkit';
import {RootState} from '../Store';

export const isLoadingWallet = (state: RootState) => {
  return state.wallet.isLoading;
};

export const isLoadingTransactions = (state: RootState) => {
  return state.wallet.isLoadingTransactions;
};

export const walletItems = (state: RootState) => {
  return state.wallet.walletContent;
};

export const walletsAmount = createDraftSafeSelector(walletItems, state => {
  return state.reduce((sum, cur) => {
    return (sum * 100 + cur.walletAmount * 100) / 100;
  }, 0);
});

export const monetaryMove = (state: RootState) => {
  return state.wallet.monetaryMovements;
};

export const getError = (state: RootState) => {
  return state.wallet.errorGet;
};

export const filtersError = (state: RootState) => {
  return state.wallet.errorFilters;
};

export const addNewCardError = (state: RootState) => {
  return state.wallet.errorAddNewCard;
};

export const deleteCardError = (state: RootState) => {
  return state.wallet.errorDeleteCard;
};

export const filteredIncome = (state: RootState) => {
  return state.wallet.filteredIncome;
};

export const filteredExp = (state: RootState) => {
  return state.wallet.filteredExpenses;
};

export const allTransactionsArray = (state: RootState) => {
  return state.wallet.walletContent.map(it => it.transactions).flat();
};
