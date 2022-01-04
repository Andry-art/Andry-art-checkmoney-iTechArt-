import {createReducer, PayloadAction} from '@reduxjs/toolkit';
import {
  getWalletItemsSuccess,
  getWalletItemsFailed,
  filterIncomeSuccess,
  filterFailed,
  filterExpensesSuccess,
  monetaryMove,
  deleteTransactionSuccess,
  addNewCardSuccess,
  addNewCardFailed,
  deleteCardSuccess,
  addTransactionSuccess,
  addCorrectTransactionSuccess,
  deleteCardFailed,
  addTransactionFailed,
  deleteTransactionFailed,
  addCorrectTransactionFailed,
  getAllItemWallet,
  filterInComeRequest,
  filterExpensesRequest,
  addNewCardRequest,
  deleteWalletCardRequest,
  addTransactionRequest,
  deleteTransactionRequest,
  addCorrectTransactionRequest,
} from '../actions/walletActions';
import {WalletInfo} from '../../types/types';
import {IWallet} from '../../types/types';

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
  isLoadingTransactions: false,
  isLoadingNewCard: false,
  isLoadingDeleteCard: false,
  errorGet: '',
  errorFilters: '',
  errorDeleteCard: '',
  errorAddNewCard: '',
};

const Wallet = createReducer<IWallet>(initialState, builder => {
  builder
    .addCase(getAllItemWallet, state => ({...state, isLoading: true}))
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
      isLoading: false,
      errorGet: action.payload,
    }))
    .addCase(filterInComeRequest, state => ({
      ...state,
      isLoadingTransactions: true,
    }))
    .addCase(filterExpensesRequest, state => ({
      ...state,
      isLoadingTransactions: true,
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
        state.isLoadingTransactions = false;
        return state;
      },
    )
    .addCase(filterFailed, (state, action: PayloadAction<string>) => ({
      ...state,
      isLoadingTransactions: false,
      errorFilters: action.payload,
    }))
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
        state.isLoadingTransactions = false;
        return state;
      },
    )
    .addCase(addNewCardRequest, state => ({
      ...state,
      isLoadingNewCard: true,
    }))
    .addCase(addNewCardSuccess, (state, action) => {
      state.walletContent.push(action.payload);
      state.isLoadingNewCard = false;
      return state;
    })
    .addCase(addNewCardFailed, (state, action: PayloadAction<string>) => ({
      ...state,
      isLoadingNewCard: false,
      errorAddNewCard: action.payload,
    }))
    .addCase(deleteWalletCardRequest, state => ({
      ...state,
      isLoadingDeleteCard: true,
    }))
    .addCase(deleteCardSuccess, (state, action: PayloadAction<number>) => {
      state.walletContent = state.walletContent.filter(
        it => it.key !== action.payload,
      );
      return state;
    })
    .addCase(deleteCardFailed, (state, action: PayloadAction<string>) => ({
      ...state,
      isLoadingDeleteCard: false,
      errorDeleteCard: action.payload,
    }))
    .addCase(monetaryMove, (state, action) => ({
      ...state,
      monetaryMovements: action.payload,
    }))
    .addCase(addTransactionRequest, state => ({
      ...state,
      isLoadingTransactions: true,
    }))
    .addCase(
      addTransactionSuccess,
      (state, action: PayloadAction<WalletInfo>) => {
        state.walletContent = state.walletContent.map(it =>
          it.key === action.payload.key ? action.payload : it,
        );
        return state;
      },
    )
    .addCase(addTransactionFailed, (state, action: PayloadAction<string>) => ({
      ...state,
      isLoadingTransactions: false,
      errorFilters: action.payload,
    }))
    .addCase(deleteTransactionRequest, state => ({
      ...state,
      isLoadingTransactions: true,
    }))
    .addCase(
      deleteTransactionSuccess,
      (state, action: PayloadAction<WalletInfo>) => {
        state.walletContent = state.walletContent.map(it =>
          it.key === action.payload.key ? action.payload : it,
        );
        return state;
      },
    )
    .addCase(
      deleteTransactionFailed,
      (state, action: PayloadAction<string>) => ({
        ...state,
        isLoadingTransactions: false,
        errorFilters: action.payload,
      }),
    )
    .addCase(addCorrectTransactionRequest, state => ({
      ...state,
      isLoadingTransactions: true,
    }))
    .addCase(addCorrectTransactionSuccess, (state, action) => {
      state.walletContent = state.walletContent.map(it =>
        it.key === action.payload.key ? action.payload : it,
      );
      return state;
    })
    .addCase(
      addCorrectTransactionFailed,
      (state, action: PayloadAction<string>) => ({
        ...state,
        isLoadingTransactions: false,
        errorFilters: action.payload,
      }),
    );
});

export default Wallet;
