import {call, put, takeEvery} from 'redux-saga/effects';
import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPreparedPayload,
  createAction,
} from '@reduxjs/toolkit';
import {Api} from '../Api';

export const userLogInRequest: ActionCreatorWithoutPayload =
  createAction('userLogInRequest');
export const userLogInSuccess: ActionCreatorWithoutPayload =
  createAction('userLogInSuccess');
export const userLogInFailed: ActionCreatorWithPreparedPayload<any, string> =
  createAction('userLogInFailed', error => ({
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
