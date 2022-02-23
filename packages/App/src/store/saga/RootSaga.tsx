import {all} from 'redux-saga/effects';
import {WalletItems} from './WalletItemsRequest';
import {userIsLogIn} from './UserLogIn';
import {DebitsItems} from './DebitsSaga';

export function* RootSaga(): Generator {
  return yield all([userIsLogIn(), WalletItems(), DebitsItems()]);
}
