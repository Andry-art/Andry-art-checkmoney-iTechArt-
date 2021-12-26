import {combineReducers, configureStore} from '@reduxjs/toolkit';
import registration from './reducers/Registration';
import wallet from './reducers/Wallet';
import createSagaMiddleware from '@redux-saga/core';
import {userIsLogIn} from './saga/userLogIn';
import {WalletItems} from './saga/walletItemsRequest';

const SagaMiddleware = createSagaMiddleware();
const SagaMiddlewareWallet = createSagaMiddleware();

const rootReducer = combineReducers({
  registration,
  wallet,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: [SagaMiddleware, SagaMiddlewareWallet],
});

SagaMiddleware.run(userIsLogIn);
SagaMiddlewareWallet.run(WalletItems);

export type RootState = ReturnType<typeof rootReducer>;
