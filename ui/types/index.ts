export type AccountType = "consumer" | "merchant" | "external";

export type TransactionType = "deposit" | "withdrawal" | "transfer";

export type TransactionStatus =
  | "pending"
  | "authorized"
  | "settled"
  | "reconciled"
  | "failed";

export interface Account {
  id: string;
  owner_name: string;
  account_type: AccountType;
  balance: number;
}

export interface Transaction {
  id: string;
  transaction_type: TransactionType;
  status: TransactionStatus;
  amount: number;
  description?: string;
  timestamp: string;
  source_account_id?: string;
  destination_account_id?: string;
}

export interface CreateAccountRequest {
  owner_name: string;
  account_type: AccountType;
}

export interface DepositRequest {
  account_id: string;
  amount: number;
}
