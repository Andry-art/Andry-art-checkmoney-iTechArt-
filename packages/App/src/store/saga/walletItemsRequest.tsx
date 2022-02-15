import {call, put, takeEvery} from 'redux-saga/effects';
import {Api} from '../Api';
import {WalletInfo, ErrorFetch} from '../../types/types';
import {
  getWalletItemsSuccess,
  getWalletItemsFailed,
  addNewCardSuccess,
  deleteCardSuccess,
  monetaryMove,
  addTransactionSuccess,
  deleteTransactionSuccess,
  addCorrectTransactionSuccess,
  addNewCardFailed,
  deleteCardFailed,
  deleteTransactionFailed,
  addCorrectTransactionFailed,
  addTransactionFailed,
  addNewCardRequest,
  deleteWalletCardRequest,
  cardMonetaryMove,
  addTransactionRequest,
  deleteTransactionRequest,
  correctTransactionInfo,
  addCorrectTransactionRequest,
} from '../actions/walletActions';
import {logOutAction} from '../actions/registration';

export function* getWalletItems(): Generator {
  try {
    const response = (yield call(
      Api.authGet.bind(Api),
      'http://localhost:8000/wallet',
    )) as Array<WalletInfo>;

    if (response) {
      response.push( {
        walletAmount: 0,
        id: -1,
        key: -1,
        color: ['#F6F6F6', '#D0D0D0'],
        walletTitle: '',
        transactions: [
        ],
      })
      yield put(getWalletItemsSuccess(response));
    }

    if (!response) {
      yield put(getWalletItemsFailed('Network isn`t working'));
    }
  } catch (error) {
    console.log('getWallet', error);
    yield put(getWalletItemsFailed((error as Error).message));
    if ((error as ErrorFetch).code === 401) {
      yield put(logOutAction());
    }
  }
}

export function* addCard(
  action: ReturnType<typeof addNewCardRequest>,
): Generator {
  try {
    const newCard = {
      key: action.payload.key,
      color: action.payload.color,
      walletTitle: action.payload.cardName,
      walletAmount: action.payload.amount,
      transactions: [],
    };

    const response = (yield call(
      Api.authPost.bind(Api),
      'http://localhost:8000/wallet',
      newCard,
    )) as WalletInfo;
    if (response) {
      yield put(addNewCardSuccess(response));
    }

    if (!response) {
      yield put(addNewCardFailed('Network isn`t working'));
    }
  } catch (error) {
    console.log('addCard', error);
    yield put(addNewCardFailed((error as Error).message));
    if ((error as ErrorFetch).code === 401) {
      yield put(logOutAction());
    }
  }
}

export function* deleteCardRequest(
  action: ReturnType<typeof deleteWalletCardRequest>,
): Generator {
  try {
    const response = yield call(
      Api.authDelete.bind(Api),
      `http://localhost:8000/wallet/${action.payload}`,
    );

    if (response) {
      yield put(deleteCardSuccess(action.payload));
    }
    if (!response) {
      yield put(deleteCardFailed('Network isn`t working'));
    }
  } catch (error) {
    console.log('Delete', error);
    yield put(deleteCardFailed((error as Error).message));
    if ((error as ErrorFetch).code === 401) {
      yield put(logOutAction());
    }
  }
}

export function* monetaryMovements(
  action: ReturnType<typeof cardMonetaryMove>,
): Generator {
  yield put(monetaryMove(action.payload));
}

export function* addTransaction(
  action: ReturnType<typeof addTransactionRequest>,
): Generator {
  try {
    const categoryAmount = action.payload.transaction.amountTransaction;
    const totalAmount = action.payload.item.walletAmount;
    const newTransaction = action.payload.transaction;
    let item = action.payload.item;

    console.log(action.payload.transaction.type);
    if (action.payload.transaction.type === 'income') {
      item = {...item, walletAmount: totalAmount + categoryAmount};
    }
    if (action.payload.transaction.type === 'expenses') {
      item = {...item, walletAmount: totalAmount - categoryAmount};
    }

    const newArrayOfTransaction = [newTransaction, ...item.transactions];
    const newPosition = {...item, transactions: newArrayOfTransaction};

    const response = (yield call(
      Api.authPut.bind(Api),
      `http://localhost:8000/wallet/${action.payload.item.id}`,
      newPosition,
    )) as WalletInfo;
    if (response) {
      yield put(addTransactionSuccess(response));
    }
    if (!response) {
      yield put(addTransactionFailed('Network isn`t working'));
    }
  } catch (error) {
    console.log('post', error);
    yield put(addTransactionFailed((error as Error).message));
    if ((error as ErrorFetch).code === 401) {
      yield put(logOutAction());
    }
  }
}

export function* deleteTransaction(
  action: ReturnType<typeof deleteTransactionRequest>,
): Generator {
  try {
    let item = action.payload.item;

    const newArrayTransactions = action.payload.item.transactions.filter(
      it => it.keyTransaction !== action.payload.transactionKey.keyTransaction,
    );

    item = {...item, transactions: newArrayTransactions};

    if (action.payload.transactionKey.type === 'income') {
      item = {
        ...item,
        walletAmount: item.walletAmount - action.payload.transactionKey.amount,
      };
    }

    if (action.payload.transactionKey.type === 'expenses') {
      item = {
        ...item,
        walletAmount: item.walletAmount + action.payload.transactionKey.amount,
      };
    }

    const response = (yield call(
      Api.authPut.bind(Api),
      `http://localhost:8000/wallet/${action.payload.item.id}`,
      item,
    )) as WalletInfo;

    if (response) {
      yield put(deleteTransactionSuccess(response));
    }
    if (!response) {
      yield put(deleteTransactionFailed('Network isn`t working'));
    }
  } catch (error) {
    console.log('deleteTransaction', error);
    yield put(deleteTransactionFailed((error as Error).message));
    if ((error as ErrorFetch).code === 401) {
      yield put(logOutAction());
    }
  }
}

export function* correctTransaction(
  action: ReturnType<typeof correctTransactionInfo>,
): Generator {
  yield put(monetaryMove(action.payload));
}

export function* correctTransactionChange(
  action: ReturnType<typeof addCorrectTransactionRequest>,
): Generator {
  try {
    let item = action.payload.item;
    const newTransactions = item.transactions.map(it =>
      it.keyTransaction === action.payload.correctedTransaction.keyTransaction
        ? action.payload.correctedTransaction
        : it,
    );
    item = {...item, transactions: newTransactions};

    const response = (yield call(
      Api.authPut.bind(Api),
      `http://localhost:8000/wallet/${action.payload.item.id}`,
      item,
    )) as WalletInfo;

    if (response) {
      yield put(addCorrectTransactionSuccess(response));
    }

    if (!response) {
      yield put(addCorrectTransactionFailed('Network isn`t working'));
    }
  } catch (error) {
    console.log('correctTransactionToSend', error);
    yield put(addCorrectTransactionFailed((error as Error).message));
    if ((error as ErrorFetch).code === 401) {
      yield put(logOutAction());
    }
  }
}

export function* WalletItems(): Generator {
  yield takeEvery('GET_WALLET_ITEMS', getWalletItems);
  yield takeEvery('ADD_CARD', addCard);
  yield takeEvery('DELETE_CARD', deleteCardRequest);
  yield takeEvery('CARD_MONETARY_MOVE', monetaryMovements);
  yield takeEvery('ADD_TRANSACTION', addTransaction);
  yield takeEvery('DELETE_TRANSACTION', deleteTransaction);
  yield takeEvery('CORRECT_TRANSACTION_INFO', correctTransaction);
  yield takeEvery('CORRECT_TRANSACTION', correctTransactionChange);
  yield takeEvery('FILTER_ALL_ITEMS_REQUEST', getWalletItems);
}
