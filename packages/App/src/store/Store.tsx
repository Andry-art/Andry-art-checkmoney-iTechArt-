import {combineReducers, configureStore} from '@reduxjs/toolkit';
import registration from './reducers/Registration';
import createSagaMiddleware from '@redux-saga/core';
import {userIsLogIn} from './saga/userLogIn';

const SagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  registration,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: [SagaMiddleware],
});

SagaMiddleware.run(userIsLogIn);

export type RootState = ReturnType<typeof rootReducer>;
