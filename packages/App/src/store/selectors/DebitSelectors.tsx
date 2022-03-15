import {createDraftSafeSelector} from '@reduxjs/toolkit';
import {RootState} from '../Store';
import {allTransactionsArray} from './WalletSelectors';

export const debitsToYou = (state: RootState) => {
  return state.debits.toYou;
};

export const yourDebits = (state: RootState) => {
  return state?.debits.yourDebit;
};

export const sumDebitsToYou = createDraftSafeSelector(
  allTransactionsArray,
  state => {
    return state
      ?.filter(it => it.type === 'debit to you')
      .reduce((sum, cur) => {
        return (sum * 100 + cur.amountTransaction * 100) / 100;
      }, 0);
  },
);

export const sumOfYourDebits = createDraftSafeSelector(
  allTransactionsArray,
  state => {
    return state
      ?.filter(it => it.type === 'your debit')
      .reduce((sum, cur) => {
        return (sum * 100 + cur.amountTransaction * 100) / 100;
      }, 0);
  },
);

export const getDebitsToYou = createDraftSafeSelector(
  allTransactionsArray,
  state => {
    return state.filter(it => it.type === 'debit to you');
  },
);

export const getYourDebits = createDraftSafeSelector(
  allTransactionsArray,
  state => {
    return state.filter(it => it.type === 'your debit');
  },
);

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

export const getErrorDebits = (state: RootState) => state.debits.errorGet;

export const newDebitError = (state: RootState) => state.debits.errorNewDebit;

export const deleteDebitError = (state: RootState) => state.debits.errorDelete;
