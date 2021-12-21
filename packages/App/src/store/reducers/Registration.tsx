import {createReducer} from '@reduxjs/toolkit';

const initialState = {
  isLogIn: false,
  isLoading: false,
  error: '',
};

const userIsLogIn = createReducer(initialState, builder => {
  builder
    .addCase('userLogInSuccess', state => ({
      ...state,
      isLogIn: true,
      isLoading: false,
    }))
    .addCase('userLogInFailed', (state, action) => ({
      ...state,
      isLogIn: false,
      isLoading: false,
      error: action.payload,
    }));
});

export default userIsLogIn;
