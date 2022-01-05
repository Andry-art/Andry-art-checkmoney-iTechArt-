import {all} from 'redux-saga/effects';
import {WalletItems} from './walletItemsRequest';
import {userIsLogIn} from './userLogIn';
import {DebitsItems} from './debitsSaga';

export function* RootSaga(): Generator {
  return yield all([userIsLogIn(), WalletItems(), DebitsItems()]);
}
