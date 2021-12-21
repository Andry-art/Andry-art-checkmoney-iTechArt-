import {put, takeEvery} from 'redux-saga/effects';
import {Api} from '../Api';

const userLogInSuccess = () => {
  return {
    type: 'userLogInSuccess',
  };
};

export const userLogInFailed = (error: any) => {
  return {
    type: 'userLogInFailed',
    payload: error,
  };
};

export function* userSendLogIn(action: any): Generator {
  try {
    const response = (yield Api.auth(
      'http://localhost:8000/auth/login',
      action.payload.email,
      action.payload.password,
    )) as Promise<Response>;
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
}
