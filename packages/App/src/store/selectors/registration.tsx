import {RootState} from '../Store';

export const IsLoadingUser = (state: RootState) => {
  return state.registration.isLoading;
};

export const userIsLogIn = (state: RootState) => {
  return state.registration.isLogIn;
};
