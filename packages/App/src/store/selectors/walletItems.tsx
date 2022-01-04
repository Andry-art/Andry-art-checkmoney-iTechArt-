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
