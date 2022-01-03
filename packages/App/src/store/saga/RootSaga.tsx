import {all} from 'redux-saga/effects';
import {WalletItems} from './walletItemsRequest';
import {userIsLogIn} from './userLogIn';

export function* RootSaga(): Generator {
  return yield all([userIsLogIn(), WalletItems()]);
}
