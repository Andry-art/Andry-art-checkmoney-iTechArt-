import {call, put, takeEvery} from 'redux-saga/effects';
import {createAction} from '@reduxjs/toolkit';
import {Api} from '../Api';

export const userLogInRequest = createAction('userLogInRequest');
export const userLogInSuccess = createAction('userLogInSuccess');
export const userLogInFailed = createAction('userLogInFailed', error => ({
  payload: error,
}));

export function* userSendLogIn(action: any): Generator {
  yield put(userLogInRequest());
  try {
    const response = (yield call(
      Api.auth.bind(Api),
      'http://localhost:8000/auth/login',
      action.payload.email,
      action.payload.password,
    )) as Response;
    console.log(response);
    if (!response) {
      return;
    }

    yield put(userLogInSuccess());
  } catch (error) {
    yield put(userLogInFailed(error));
  }
}

export function* userSendSignUp(action: any): Generator {
  yield put(userLogInRequest());
  try {
    const response = (yield call(
      Api.auth.bind(Api),
      'http://localhost:8000/auth/register',
      action.payload.email,
      action.payload.password,
    )) as Response;
    console.log(response);
    if (!response) {
      return;
    }

    yield put(userLogInSuccess());
  } catch (error) {
    yield put(userLogInFailed(error));
  }
}

export function* userIsLogIn(): Generator {
  yield takeEvery('USER_LOG_IN', userSendLogIn);
  yield takeEvery('USER_SIGN_UP', userSendSignUp);
}
