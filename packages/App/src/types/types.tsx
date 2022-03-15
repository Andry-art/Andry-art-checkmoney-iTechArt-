export type AmountInCents = number;

export interface ITransactions {
  keyTransaction: number;
  type: string;
  amountTransaction: number;
  category: string;
  date: string;
  icon: string;
  keyOfWallet?: number;
  person?: '';
  coordinate?: {
    latitude: number;
    longitude: number;
    latitudeDelta?: number;
    longitudeDelta?: number;
  };
}
export type DebitInfo = {
  type: string;
  keyTransaction: number;
  date: string;
  keyOfWallet: number;
  amountTransaction: number;
  person: string;
  category?: string;
  icon?: string;
};

export interface WalletInfo {
  id: number;
  key: number;
  color: Array<string>;
  walletTitle: string;
  walletAmount: AmountInCents;
  transactions: Array<ITransactions>;
}

export type WalletNavigatorList = {
  Balance: undefined;
  'New Card': undefined;
  'Correct Transaction': undefined;
  'Add Transaction': undefined;
  'Debit Info': undefined;
};

export type DebitNavigatorList = {
  Debits: undefined;
  'Add New Debit': undefined;
  'Debit Info': undefined;
};

export type RegistrationNavigation = {
  LogIn: undefined;
  SignIn: undefined;
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
  filteredIncome: Array<WalletInfo>;
  filteredExpenses: Array<WalletInfo>;
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

export type ErrorFetch = {
  code: number;
  message: string;
};

export enum DebitType {
  toYou = 'Debit to you',
  yourDebit = 'Your debit',
  icon = 'iconDebit',
}

export enum Months {
  January = 0,
  February = 1,
  March = 2,
  April = 3,
  May = 4,
  June = 5,
  July = 6,
  August = 7,
  September = 8,
  October = 9,
  November = 10,
  December = 11,
}

export enum TransactionType {
  income = 'income',
  expenses = 'expenses',
}

export type Locations = {
  latitude: number;
  longitude: number;
};

export enum Category {
  Car = 'Car',
  Health = 'Health',
  Unknown = 'Unknown',
  Grocery = 'Grocery',
  Shopping = 'Shopping',
  Restaurant = 'Restaurant',
}

export enum DayOfWeek {
  Mon = 1,
  Tue = 2,
  Wed = 3,
  Thu = 4,
  Fri = 5,
  Sat = 6,
  Sun = 0,
}

export type CategoryChart = Record<Category, number>;

export type textType =
  | 'none'
  | 'URL'
  | 'addressCity'
  | 'addressCityAndState'
  | 'addressState'
  | 'countryName'
  | 'creditCardNumber'
  | 'emailAddress'
  | 'familyName'
  | 'fullStreetAddress'
  | 'givenName'
  | 'jobTitle'
  | 'location'
  | 'middleName'
  | 'name'
  | 'namePrefix'
  | 'nameSuffix'
  | 'nickname'
  | 'organizationName'
  | 'postalCode'
  | 'streetAddressLine1'
  | 'streetAddressLine2'
  | 'sublocality'
  | 'telephoneNumber'
  | 'username'
  | 'password'
  | 'newPassword'
  | 'oneTimeCode'
  | undefined;

export type TransactionRequest = {
  keyTransaction: number;
  type: string;
  amountTransaction: number;
  category: string;
  icon: string;
  date: Date;
  coordinate?: Locations | {};
};
