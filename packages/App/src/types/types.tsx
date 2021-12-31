export type AmountInCents = number;

export interface Transactions {
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
  transactions: Array<Transactions>;
}

export interface MonetaryMovements {
  key: number;
  amount: number;
  title: string;
}
