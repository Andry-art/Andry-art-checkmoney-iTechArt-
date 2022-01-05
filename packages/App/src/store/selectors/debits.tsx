import {createDraftSafeSelector} from '@reduxjs/toolkit';
import {RootState} from '../Store';

export const debitsToYou = (state: RootState) => {
  return state.debits.toYou;
};

export const yourDebits = (state: RootState) => {
  return state?.debits.yourDebit;
};

export const sumDebitsToYou = createDraftSafeSelector(debitsToYou, state => {
  return state?.reduce((sum, cur) => {
    return (sum * 100 + cur.amount * 100) / 100;
  }, 0);
});

export const sumOfYourDebits = createDraftSafeSelector(yourDebits, state => {
  return state.reduce((sum, cur) => {
    return (sum * 100 + cur.amount * 100) / 100;
  }, 0);
});

export const getDebitsToYou = (state: RootState) => {
  return state.debits.toYou;
};

export const getYourDebits = (state: RootState) => {
  return state.debits.yourDebit;
};

export const debitInfo = (state: RootState) => {
  return state.debits.debInfo;
};

export const wallets = (state: RootState) => {
  const wallets = state.wallet.walletContent;
  const debit = state.debits.debInfo;
  return {wallets, debit};
};

export const walletName = createDraftSafeSelector(wallets, state => {
  return state.wallets.find(it => it.key === state.debit.keyOfWallet);
});
