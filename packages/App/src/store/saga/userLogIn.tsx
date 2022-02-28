import {call, put, takeEvery} from 'redux-saga/effects';
import {Api} from '../Api';
import {
  userLogIn,
  userLogInSuccess,
  userLogInFailed,
  logOutActionSuccess,
} from '../actions/RegistrationActions';
import EncryptedStorage from 'react-native-encrypted-storage';
import {cleanErrorsWallet} from '../actions/RalletActions';
import {cleanErrorsDebits} from '../actions/DebitsActions';

export function* userSendLogIn(
  action: ReturnType<typeof userLogIn>,
): Generator {
  try {
    const response = (yield call(
      Api.auth.bind(Api),
      'http://localhost:8000/auth/login',
      action.payload.email,
      action.payload.password,
    )) as Response;

    if (response) {
      yield put(userLogInSuccess());
    }

    if (!response) {
      yield put(userLogInFailed('Network isn`t working'));
    }
  } catch (error) {
    yield put(userLogInFailed((error as Error).message));
  }
}

export function* userSendSignUp(
  action: ReturnType<typeof userLogIn>,
): Generator {
  try {
    const response = (yield call(
      Api.auth.bind(Api),
      'http://localhost:8000/auth/register',
      action.payload.email,
      action.payload.password,
    )) as Response;
    if (response) {
      yield put(userLogInSuccess());
    }

    if (!response) {
      yield put(userLogInFailed('Network isn`t working'));
    }
  } catch (error) {
    yield put(userLogInFailed((error as Error).message));
  }
}

export function* userLogOut(): Generator {
  try {
    yield EncryptedStorage.clear();
    yield put(logOutActionSuccess());
    yield put(cleanErrorsWallet());
    yield put(cleanErrorsDebits());
  } catch (error) {
    yield put(userLogInFailed((error as Error).message));
  }
}

export function* userIsLogIn(): Generator {
  yield takeEvery('USER_LOG_IN', userSendLogIn);
  yield takeEvery('USER_SIGN_UP', userSendSignUp);
  yield takeEvery('LOGOUT', userLogOut);
}
