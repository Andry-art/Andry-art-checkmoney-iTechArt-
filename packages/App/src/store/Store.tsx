import {combineReducers, configureStore} from '@reduxjs/toolkit';
import registration from './reducers/Registration';
import wallet from './reducers/Wallet';
import debits from './reducers/Debits';
import statistic from './reducers/Statistic';
import createSagaMiddleware from '@redux-saga/core';
import {RootSaga} from '../store/saga/RootSaga';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const SagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  registration,
  wallet,
  debits,
  statistic
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [SagaMiddleware],
});

export const persister = persistStore(store);

SagaMiddleware.run(RootSaga);

export type RootState = ReturnType<typeof rootReducer>;
