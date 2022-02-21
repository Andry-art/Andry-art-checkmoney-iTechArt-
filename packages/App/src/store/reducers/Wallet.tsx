import {createReducer, PayloadAction} from '@reduxjs/toolkit';
import {
  getWalletItemsSuccess,
  getWalletItemsFailed,
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
  addNewCardRequest,
  deleteWalletCardRequest,
  addTransactionRequest,
  deleteTransactionRequest,
  addCorrectTransactionRequest,
  cleanErrorsWallet,
} from '../actions/walletActions';
import {WalletInfo} from '../../types/types';
import {IWallet} from '../../types/types';

const initialState: IWallet = {
  walletContent: [
    {
      walletAmount: 0,
      id: 0,
      key: 0,
      color: ['#F39034', '#FF2727'],
      walletTitle: '',
      transactions: [
        {
          keyTransaction: 0,
          type: '',
          amountTransaction: 0,
          category: '',
          date: '',
          icon: '',
        },
      ],
    },
  ],
  filteredIncome: [],
  filteredExpenses: [],
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
    .addCase(getAllItemWallet, state => {
      state.isLoading = true;
      state.errorGet = '';
      state.errorFilters = '';
      state.errorDeleteCard = '';
      state.errorAddNewCard = '';
      return state;
    })
    .addCase(
      getWalletItemsSuccess,
      (state, action: PayloadAction<Array<WalletInfo>>) => {
        state.isLoading = false;
        state.isLoadingTransactions = false;
        state.errorGet = '';
        state.errorFilters = '';
        state.errorDeleteCard = '';
        state.errorAddNewCard = '';
        state.walletContent = action.payload;
        state.filteredIncome = action.payload.map(
          it =>
            (it = {
              ...it,
              transactions: it.transactions.filter(
                item => item.type === 'income',
              ),
            }),
        );
        state.filteredExpenses = action.payload.map(
          it =>
            (it = {
              ...it,
              transactions: it.transactions.filter(
                item => item.type === 'expenses',
              ),
            }),
        );

        return state;
      },
    )
    .addCase(getWalletItemsFailed, (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.errorGet = action.payload;
      return state;
    })
    .addCase(addNewCardRequest, state => {
      state.isLoadingNewCard = true;
      state.errorAddNewCard = '';
      return state;
    })
    .addCase(addNewCardSuccess, (state, action) => {
      state.walletContent.push(action.payload);
      state.isLoadingNewCard = false;
      return state;
    })
    .addCase(addNewCardFailed, (state, action: PayloadAction<string>) => {
      state.isLoadingNewCard = false;
      state.errorAddNewCard = `Couldn't add card.${action.payload}`;
      return state;
    })
    .addCase(deleteWalletCardRequest, state => {
      state.isLoadingDeleteCard = true;
      state.errorDeleteCard = '';
      return state;
    })
    .addCase(deleteCardSuccess, (state, action: PayloadAction<number>) => {
      state.walletContent = state.walletContent.filter(
        it => it.key !== action.payload,
      );
      state.isLoadingDeleteCard = false;
      return state;
    })
    .addCase(deleteCardFailed, (state, action: PayloadAction<string>) => {
      state.isLoadingDeleteCard = false;
      state.errorDeleteCard = `Couldn't delete card.${action.payload}`;
      return state;
    })
    .addCase(monetaryMove, (state, action) => {
      state.monetaryMovements = action.payload;
      return state;
    })
    .addCase(addTransactionRequest, state => {
      state.isLoadingTransactions = true;
      state.errorFilters = '';
      return state;
    })
    .addCase(
      addTransactionSuccess,
      (state, action: PayloadAction<WalletInfo>) => {
        state.walletContent = state.walletContent.map(it =>
          it.key === action.payload.key ? action.payload : it,
        );
        state.filteredIncome = state.walletContent.map(
          it =>
            (it = {
              ...it,
              transactions: it.transactions.filter(
                item => item.type === 'income',
              ),
            }),
        );
        state.filteredExpenses = state.walletContent.map(
          it =>
            (it = {
              ...it,
              transactions: it.transactions.filter(
                item => item.type === 'expenses',
              ),
            }),
        );
        state.isLoadingTransactions = false;
        return state;
      },
    )
    .addCase(addTransactionFailed, (state, action: PayloadAction<string>) => {
      state.isLoadingTransactions = false;
      state.errorFilters = action.payload;
      return state;
    })
    .addCase(deleteTransactionRequest, state => {
      state.isLoadingTransactions = true;
      state.errorFilters = '';
      return state;
    })
    .addCase(
      deleteTransactionSuccess,
      (state, action: PayloadAction<WalletInfo>) => {
        state.walletContent = state.walletContent.map(it =>
          it.key === action.payload.key ? action.payload : it,
        );
        state.filteredIncome = state.walletContent.map(
          it =>
            (it = {
              ...it,
              transactions: it.transactions.filter(
                item => item.type === 'income',
              ),
            }),
        );
        state.filteredExpenses = state.walletContent.map(
          it =>
            (it = {
              ...it,
              transactions: it.transactions.filter(
                item => item.type === 'expenses',
              ),
            }),
        );
        state.isLoadingTransactions = false;
        return state;
      },
    )
    .addCase(
      deleteTransactionFailed,
      (state, action: PayloadAction<string>) => {
        state.isLoadingTransactions = false;
        state.errorFilters = action.payload;
        return state;
      },
    )
    .addCase(addCorrectTransactionRequest, state => {
      state.isLoadingTransactions = true;
      state.errorFilters = '';
      return state;
    })
    .addCase(addCorrectTransactionSuccess, (state, action) => {
      state.walletContent = state.walletContent.map(it =>
        it.key === action.payload.key ? action.payload : it,
      );
      state.isLoadingTransactions = false;
      return state;
    })
    .addCase(
      addCorrectTransactionFailed,
      (state, action: PayloadAction<string>) => {
        state.isLoadingTransactions = false;
        state.errorFilters = action.payload;
        return state;
      },
    )
    .addCase(cleanErrorsWallet, state => {
      state.errorGet = '';
      state.errorFilters = '';
      state.errorDeleteCard = '';
      state.errorAddNewCard = '';
      return state;
    });
});

export default Wallet;
