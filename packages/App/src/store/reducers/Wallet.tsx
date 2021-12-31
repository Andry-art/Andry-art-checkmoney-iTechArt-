import {createReducer, PayloadAction} from '@reduxjs/toolkit';
import {
  getWalletItemsSuccess,
  getWalletItemsFailed,
  filterIncomeSuccess,
  filterExpensesSuccess,
  monetaryMove,
  deleteTransactionSaga,
  addNewCardSaga,
  deleteCardSaga,
  addTransactionSaga,
  addCorrectTransaction,
} from '../saga/walletActionsSaga';
import {WalletInfo} from '../../types/types';

interface MonetaryMovements {
  key: number;
  amount: number;
  title?: string;
  type?: string;
  category?: string;
  date?: string;
  icon?: string;
  idCard?: number;
}

interface IWallet {
  walletContent: Array<WalletInfo>;
  monetaryMovements: MonetaryMovements;
  isLoading: boolean;
  error: string;
}

const initialState: IWallet = {
  walletContent: [],
  monetaryMovements: {
    key: 0,
    amount: 0,
    title: '',
    type: '',
    category: '',
    date: '',
    idCard: 0,
  },
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
    )
    .addCase(addNewCardSaga, (state, action) => {
      state.walletContent.push(action.payload);
      return state;
    })
    .addCase(deleteCardSaga, (state, action: PayloadAction<number>) => {
      state.walletContent = state.walletContent.filter(
        it => it.key !== action.payload,
      );
      return state;
    })
    .addCase(monetaryMove, (state, action) => ({
      ...state,
      monetaryMovements: action.payload,
    }))
    .addCase(addTransactionSaga, (state, action: PayloadAction<WalletInfo>) => {
      state.walletContent = state.walletContent.map(it =>
        it.key === action.payload.key ? action.payload : it,
      );
      return state;
    })
    .addCase(
      deleteTransactionSaga,
      (state, action: PayloadAction<WalletInfo>) => {
        state.walletContent = state.walletContent.map(it =>
          it.key === action.payload.key ? action.payload : it,
        );
        return state;
      },
    )
    .addCase(addCorrectTransaction, (state, action) => {
      state.walletContent = state.walletContent.map(it =>
        it.key === action.payload.key ? action.payload : it,
      );
      return state;
    });
});

export default Wallet;
