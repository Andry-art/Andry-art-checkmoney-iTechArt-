import {RootState} from '../Store';

export const IsLoadingWallet = (state: RootState) => {
  return state.wallet.isLoading;
};

export const WalletItems = (state: RootState) => {
  return state.wallet.walletContent;
};

export const monetaryMove = (state: RootState) => {
  return state.wallet.monetaryMovements;
};
