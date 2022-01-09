import {createReducer, PayloadAction} from '@reduxjs/toolkit';
import {
  getDebitsItemsRequest,
  getDebitsItemsSuccess,
  getDebitsItemsFailed,
  addDebitInfo,
  addNewDebitRequest,
  addNewDebitToYouSuccess,
  addNewYourDebitSuccess,
  addNewDebitFailed,
  deleteDebitRequest,
  deleteDebitToYouSuccess,
  deleteYourDebitSuccess,
  deleteDebitFailed,
} from '../actions/debitsActions';
import {DebitInfo, Debits} from '../../types/types';

interface IDebits {
  toYou: Array<DebitInfo>;
  yourDebit: Array<DebitInfo>;
  debInfo: DebitInfo;
  isLoading: boolean;
  isNewDebitLoading: boolean;
  isDeleteLoading: boolean;
  errorGet: string;
  errorNewDebit: string;
  errorDelete: string;
}

const initialState: IDebits = {
  toYou: [],
  yourDebit: [],
  debInfo: {
    type: '',
    keyOfWallet: 0,
    key: 0,
    date: '',
    person: '',
    amount: 0,
  },
  isLoading: false,
  isNewDebitLoading: false,
  isDeleteLoading: false,
  errorGet: '',
  errorNewDebit: '',
  errorDelete: '',
};

const debits = createReducer<IDebits>(initialState, builder => {
  builder
    .addCase(getDebitsItemsRequest, state => ({
      ...state,
      isLoading: true,
    }))
    .addCase(getDebitsItemsSuccess, (state, action: PayloadAction<Debits>) => {
      state.toYou = action.payload[0].debitsToYou;
      state.yourDebit = action.payload[1].yourDebits;
      state.isLoading = false;
      return state;
    })
    .addCase(getDebitsItemsFailed, (state, action: PayloadAction<string>) => ({
      ...state,
      isLoading: false,
      errorGet: action.payload,
    }))
    .addCase(addDebitInfo, (state, action: PayloadAction<DebitInfo>) => ({
      ...state,
      debInfo: action.payload,
    }))
    .addCase(addNewDebitRequest, state => ({
      ...state,
      isNewDebitLoading: true,
    }))
    .addCase(
      addNewDebitToYouSuccess,
      (state, action: PayloadAction<{debitsToYou: Array<DebitInfo>}>) => {
        state.isNewDebitLoading = false;
        state.toYou = action.payload.debitsToYou;
        return state;
      },
    )
    .addCase(
      addNewYourDebitSuccess,
      (state, action: PayloadAction<{yourDebits: Array<DebitInfo>}>) => {
        state.isNewDebitLoading = false;
        state.yourDebit = action.payload.yourDebits;
        return state;
      },
    )
    .addCase(addNewDebitFailed, (state, action: PayloadAction<string>) => ({
      ...state,
      isLoading: false,
      errorNewDebit: `Couldn't add debit.${action.payload}`,
    }))
    .addCase(deleteDebitRequest, state => ({
      ...state,
      isDeleteLoading: true,
      errorDelete: '',
    }))
    .addCase(
      deleteDebitToYouSuccess,
      (state, action: PayloadAction<{debitsToYou: Array<DebitInfo>}>) => {
        state.isNewDebitLoading = false;
        state.toYou = action.payload.debitsToYou;
        return state;
      },
    )
    .addCase(
      deleteYourDebitSuccess,
      (state, action: PayloadAction<{yourDebits: Array<DebitInfo>}>) => {
        state.isNewDebitLoading = false;
        state.yourDebit = action.payload.yourDebits;
        return state;
      },
    )
    .addCase(deleteDebitFailed, (state, action: PayloadAction<string>) => ({
      ...state,
      isLoading: false,
      errorDelete: `Couldn't delete debit.${action.payload}`,
    }));
});

export default debits;
