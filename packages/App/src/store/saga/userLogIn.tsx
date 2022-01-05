import {call, put, takeEvery} from 'redux-saga/effects';
import {Api} from '../Api';
import {
  userLogIn,
  userLogInSuccess,
  userLogInFailed,
} from '../actions/registration';

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

    if (!response) {
      return;
    }

    yield put(userLogInSuccess());
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
    if (!response) {
      return;
    }

    yield put(userLogInSuccess());
  } catch (error) {
    yield put(userLogInFailed((error as Error).message));
  }
}

export function* userIsLogIn(): Generator {
  yield takeEvery('USER_LOG_IN', userSendLogIn);
  yield takeEvery('USER_SIGN_UP', userSendSignUp);
}
