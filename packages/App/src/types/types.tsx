export type AmountInCents = number;

export interface Transactions {
  type: string;
  amount: number;
  category: string;
  date: string;
  icon: string;
}

export interface WalletInfo {
  key: string;
  color: string;
  walletTitle: string;
  walletAmount: AmountInCents;
  transactions: Array<Transactions>;
}
