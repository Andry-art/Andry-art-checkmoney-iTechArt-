import {createReducer, PayloadAction} from '@reduxjs/toolkit';
import {
  getWalletItemsSuccess,
  getWalletItemsFailed,
  filterIncomeSuccess,
  filterExpensesSuccess,
} from '../saga/walletActionsSaga';
import {WalletInfo} from '../../types/types';

interface IWallet {
  walletContent: Array<WalletInfo>;
  isLoading: boolean;
  error: string;
}

const initialState: IWallet = {
  walletContent: [],
  isLoading: false,
  error: '',
};

const Wallet = createReducer<IWallet>(initialState, builder => {
  builder
    .addCase('GET_WALLET_ITEMS', state => ({...state, isLoading: true}))
    .addCase(
      getWalletItemsSuccess,
      (state, action: PayloadAction<Array<WalletInfo>>) => ({
        ...state,
        isLoading: false,
        walletContent: action.payload,
      }),
    )
    .addCase(getWalletItemsFailed, (state, action: PayloadAction<string>) => ({
      ...state,
      isLogIn: false,
      isLoading: false,
      error: action.payload,
    }))
    .addCase(
      filterIncomeSuccess,
      (
        state,
        action: PayloadAction<{response: Array<WalletInfo>; page: number}>,
      ) => {
        state.walletContent[action.payload.page].transactions =
          action.payload.response[action.payload.page].transactions.filter(
            it => it.type === 'income',
          );
        return state;
      },
    )
    .addCase(
      filterExpensesSuccess,
      (
        state,
        action: PayloadAction<{response: Array<WalletInfo>; page: number}>,
      ) => {
        state.walletContent[action.payload.page].transactions =
          action.payload.response[action.payload.page].transactions.filter(
            it => it.type === 'expenses',
          );
        return state;
      },
    );
});

export default Wallet;
