import {createAction} from '@reduxjs/toolkit';
import {Debits, DebitInfo, WalletInfo} from '../../types/types';

export const getDebitsItemsRequest =
  createAction<undefined>('GET_DEBITS_ITEMS');
export const getDebitsItemsSuccess = createAction<Debits>(
  'getDebitsItemsSuccess',
);
export const getDebitsItemsFailed = createAction<string>(
  'getDebitsItemsFailed',
);

export const addDebitInfo = createAction<DebitInfo>('addDebitInfo');

export const addNewDebitRequest =
  createAction<{wallet: WalletInfo; debit: DebitInfo; array: Array<DebitInfo>}>(
    'addNewDebit',
  );

export const addNewDebitToYouSuccess = createAction<{
  debitsToYou: Array<DebitInfo>;
}>('addNewDebitToYouSuccess');

export const addNewYourDebitSuccess = createAction<{
  yourDebits: Array<DebitInfo>;
}>('addNewYourDebitSuccess');

export const addNewDebitFailed = createAction<string>('addNewDebitFailed');

export const deleteDebitRequest =
  createAction<{wallet: WalletInfo; debit: DebitInfo; array: Array<DebitInfo>}>(
    'deleteDebitRequest',
  );

export const deleteDebitToYouSuccess = createAction<{
  debitsToYou: Array<DebitInfo>;
}>('deleteDebitToYouSuccess');

export const deleteYourDebitSuccess = createAction<{
  yourDebits: Array<DebitInfo>;
}>('deleteYourDebitSuccess');

export const deleteDebitFailed = createAction<string>('deleteDebitFailed');
