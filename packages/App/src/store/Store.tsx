import {combineReducers, configureStore} from '@reduxjs/toolkit';
import registration from './reducers/Registration';
import wallet from './reducers/Wallet';
import createSagaMiddleware from '@redux-saga/core';
import {RootSaga} from '../store/saga/RootSaga';

const SagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  registration,
  wallet,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: [SagaMiddleware],
});

SagaMiddleware.run(RootSaga);

export type RootState = ReturnType<typeof rootReducer>;
