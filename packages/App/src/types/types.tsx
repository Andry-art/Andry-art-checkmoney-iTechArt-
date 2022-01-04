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

export type BalanceNavigatorList = {
  BalanceMenu: undefined;
  BalanceWallet: undefined;
  NewCard: undefined;
  correctTransaction: undefined;
  addMonetaryMovements: undefined;
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
