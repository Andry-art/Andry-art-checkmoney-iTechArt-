export type AmountInCents = number;

export interface ITransactions {
  keyTransaction: number;
  type: string;
  amountTransaction: number;
  category: string;
  date: string;
  icon: string;
}

export interface WalletInfo {
  id: number;
  key: number;
  color: string;
  walletTitle: string;
  walletAmount: AmountInCents;
  transactions: Array<ITransactions>;
}

export type WalletNavigatorList = {
  BalanceMenu: undefined;
  BalanceWallet: undefined;
  NewCard: undefined;
  correctTransaction: undefined;
  addMonetaryMovements: undefined;
};

export type DebitNavigatorList = {
  BalanceMenu: undefined;
  Debits: undefined;
  NewDebits: undefined;
  DebitInfo: undefined;
};

export type ChosenCategory = {
  icon: string;
  category: string;
};

export type Income = ['iconUnknownSource', 'iconSalarySource'];

export type Expenses = [
  'iconUnknownSource',
  'iconCarSource',
  'iconHealthSource',
  'iconGrocerySource',
  'iconShoppingSource',
  'iconRestaurantSource',
];

export interface MonetaryMovements {
  key: number;
  amount: number;
  title?: string;
  type?: string;
  category?: string;
  date?: string;
  icon?: string;
  idCard?: number;
}

export interface IWallet {
  walletContent: Array<WalletInfo>;
  monetaryMovements: MonetaryMovements;
  isLoading: boolean;
  isLoadingTransactions: boolean;
  isLoadingNewCard: boolean;
  isLoadingDeleteCard: boolean;
  errorGet: string;
  errorFilters: string;
  errorAddNewCard: string;
  errorDeleteCard: string;
}

export type DebitInfo = {
  type: string;
  key: number;
  date: string;
  keyOfWallet: number;
  amount: number;
  person: string;
};

export type DebitsToYou = {
  debitsToYou: Array<DebitInfo>;
};

export type YourDebits = {
  yourDebits: Array<DebitInfo>;
};

export type Debits = [
  {id: number; debitsToYou: Array<DebitInfo>},
  {id: number; yourDebits: Array<DebitInfo>},
];
