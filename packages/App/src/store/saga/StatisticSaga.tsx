import {put, takeEvery} from 'redux-saga/effects';
import {setMonth, setMonthSuccsess} from '../actions/StatisticActions';

export function* setMonthReduser(
  action: ReturnType<typeof setMonth>,
): Generator {
  try {
    yield put(setMonthSuccsess(action.payload));
  } catch (error) {
    console.log(error);
  }
}

export function* StatisticSaga(): Generator {
  yield takeEvery('SET_MONTH', setMonthReduser);
}
