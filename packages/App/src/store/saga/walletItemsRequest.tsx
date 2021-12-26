import {call, put, takeEvery} from 'redux-saga/effects';
import {
  getWalletItemsSuccess,
  getWalletItemsFailed,
  filterIncomeSuccess,
  filterExpensesSuccess,
} from './walletActionsSaga';
import {Api} from '../Api';
import {WalletInfo} from '../../types/types';
import {filterInComeItems} from '../actions/walletActions';

export function* getWalletItems(): Generator {
  try {
    const response = (yield call(
      Api.authGet.bind(Api),
      'http://localhost:8000/wallet',
    )) as Array<WalletInfo>;

    if (!response) {
      return;
    }

    yield put(getWalletItemsSuccess(response));
  } catch (error) {
    console.log('getWallet', error);
    yield put(getWalletItemsFailed((error as Error).message));
  }
}

export function* filterItems(
  action: ReturnType<typeof filterInComeItems>,
): Generator {
  if (action.type === 'FILTER_INCOME') {
    try {
      const page = action.payload;
      const response = (yield call(
        Api.authGet.bind(Api),
        'http://localhost:8000/wallet',
      )) as Array<WalletInfo>;

      if (!response) {
        return;
      }

      yield put(filterIncomeSuccess({response, page}));
    } catch (error) {
      console.log('filterErrorIncome', error);
      yield put(getWalletItemsFailed((error as Error).message));
    }
  }

  if (action.type === 'FILTER_EXPENSES') {
    try {
      const page = action.payload;
      const response = (yield call(
        Api.authGet.bind(Api),
        'http://localhost:8000/wallet',
      )) as Array<WalletInfo>;

      if (!response) {
        return;
      }

      yield put(filterExpensesSuccess({response, page}));
    } catch (error) {
      console.log('filterErrorExpenses', error);
      yield put(getWalletItemsFailed((error as Error).message));
    }
  }
}

export function* WalletItems(): Generator {
  yield takeEvery('GET_WALLET_ITEMS', getWalletItems);
  yield takeEvery('FILTER_INCOME', filterItems);
  yield takeEvery('FILTER_EXPENSES', filterItems);
}
