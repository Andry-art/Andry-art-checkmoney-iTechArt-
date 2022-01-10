import {call, put, takeEvery} from 'redux-saga/effects';
import {Api} from '../Api';
import {DebitInfo, Debits, WalletInfo} from '../../types/types';
import {
  getDebitsItemsSuccess,
  getDebitsItemsFailed,
  addNewDebitRequest,
  addNewDebitToYouSuccess,
  addNewYourDebitSuccess,
  addNewDebitFailed,
  deleteDebitRequest,
  deleteDebitToYouSuccess,
  deleteYourDebitSuccess,
  deleteDebitFailed,
} from '../actions/debitsActions';

export function* getDebitsItems(): Generator {
  try {
    const response = (yield call(
      Api.authGet.bind(Api),
      'http://localhost:8000/debits',
    )) as Debits;

    if (response) {
      yield put(getDebitsItemsSuccess(response));
    }

    if (!response) {
      yield put(getDebitsItemsFailed('Network isn`t working'));
    }
  } catch (error) {
    console.log('getWallet', error);
    yield put(getDebitsItemsFailed((error as Error).message));
  }
}

export function* addNewDebit(
  action: ReturnType<typeof addNewDebitRequest>,
): Generator {
  try {
    let wallet = action.payload.wallet;

    const responseWallet = (yield call(
      Api.authPut.bind(Api),
      `http://localhost:8000/wallet/${action.payload.wallet.id}`,
      wallet,
    )) as WalletInfo;

    if (!responseWallet) {
      yield put(addNewDebitFailed('Network isn`t working'));
    }

    if (action.payload.debit.type === 'debit to you' && responseWallet) {
      let debits = action.payload.array;
      debits = [...debits, action.payload.debit];

      const responseDebit = (yield call(
        Api.authPut.bind(Api),
        'http://localhost:8000/debits/1',
        {debitsToYou: debits},
      )) as {debitsToYou: Array<DebitInfo>};
      if (responseDebit) {
        yield put(addNewDebitToYouSuccess(responseDebit));
      }
      if (!responseDebit) {
        yield put(addNewDebitFailed('Network isn`t working'));
      }
    }

    if (action.payload.debit.type === 'your debit' && responseWallet) {
      let debits = action.payload.array;
      debits = [...debits, action.payload.debit];

      const responseDebit = (yield call(
        Api.authPut.bind(Api),
        'http://localhost:8000/debits/2',
        {yourDebits: debits},
      )) as {yourDebits: Array<DebitInfo>};
      if (responseDebit) {
        console.log(responseDebit);
        yield put(addNewYourDebitSuccess(responseDebit));
      }
      if (!responseDebit) {
        yield put(addNewDebitFailed('Network isn`t working'));
      }
    }
  } catch (error) {
    console.log('newDebits', error);
    yield put(addNewDebitFailed((error as Error).message));
  }
}

export function* deleteDebit(
  action: ReturnType<typeof deleteDebitRequest>,
): Generator {
  try {
    let wallet = action.payload.wallet;

    const responseWallet = (yield call(
      Api.authPut.bind(Api),
      `http://localhost:8000/wallet/${action.payload.wallet.id}`,
      wallet,
    )) as WalletInfo;

    if (!responseWallet) {
      yield put(deleteDebitFailed('Network isn`t working'));
    }

    if (action.payload.debit.type === 'debit to you' && responseWallet) {
      let debits = action.payload.array;
      debits = debits.filter(it => it.key !== action.payload.debit.key);

      const responseDebit = (yield call(
        Api.authPut.bind(Api),
        'http://localhost:8000/debits/1',
        {debitsToYou: debits},
      )) as {debitsToYou: Array<DebitInfo>};
      if (responseDebit) {
        yield put(deleteDebitToYouSuccess(responseDebit));
      }
      if (!responseDebit) {
        yield put(deleteDebitFailed('Network isn`t working'));
      }
    }

    if (action.payload.debit.type === 'your debit' && responseWallet) {
      let debits = action.payload.array;
      debits = debits.filter(it => it.key !== action.payload.debit.key);

      const responseDebit = (yield call(
        Api.authPut.bind(Api),
        'http://localhost:8000/debits/2',
        {yourDebits: debits},
      )) as {yourDebits: Array<DebitInfo>};
      if (responseDebit) {
        yield put(deleteYourDebitSuccess(responseDebit));
      }
      if (!responseDebit) {
        yield put(deleteDebitFailed('Network isn`t working'));
      }
    }
  } catch (error) {
    console.log('newDebits', error);
    yield put(deleteDebitFailed((error as Error).message));
  }
}

export function* DebitsItems(): Generator {
  yield takeEvery('GET_DEBITS_ITEMS', getDebitsItems);
  yield takeEvery('addNewDebit', addNewDebit);
  yield takeEvery('deleteDebitRequest', deleteDebit);
}
