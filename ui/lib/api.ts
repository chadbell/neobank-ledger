import { Account, CreateAccountRequest, DepositRequest, Transaction } from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(error.detail ?? "Request failed");
  }

  return res.json();
}

// Accounts
export const getAccounts = (): Promise<Account[]> =>
  request<Account[]>("/accounts");

export const getAccount = (id: string): Promise<Account> =>
  request<Account>(`/accounts/${id}`);

export const createAccount = (data: CreateAccountRequest): Promise<Account> =>
  request<Account>("/accounts", { method: "POST", body: JSON.stringify(data) });

// Transactions
export const deposit = (data: DepositRequest): Promise<Transaction> =>
  request<Transaction>("/deposit", { method: "POST", body: JSON.stringify(data) });
