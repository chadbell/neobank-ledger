import { getAccounts } from "@/lib/api";
import AccountCard from "@/components/accounts/AccountCard";
import Button from "@/components/ui/Button";
import { Account } from "@/types";

export default async function DashboardPage() {
  let accounts: Account[] = [];

  try {
    accounts = await getAccounts();
  } catch {
    // API may not be running — render empty state
  }

  const totalBalance = accounts.reduce((sum, a) => sum + a.balance, 0);

  return (
    <div className="max-w-4xl px-10 py-9">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
          <p className="text-sm text-gray-400 mt-1">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
        <Button>+ New Account</Button>
      </div>

      {/* Action Items */}
      <section className="mb-9">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-base font-bold text-gray-900">Action items</h2>
          <span className="text-sm text-[#1e3a6e] font-medium cursor-pointer">See all →</span>
        </div>
        <div className="bg-white rounded-xl overflow-hidden">
          <div className="flex justify-between items-center px-5 py-4 border-b border-[#f0ede6] hover:bg-[#fafaf7] cursor-pointer">
            <div>
              <div className="text-sm font-semibold text-gray-900">Pending Transactions</div>
              <div className="text-xs text-gray-400 mt-0.5">Transactions awaiting settlement</div>
            </div>
            <span className="text-gray-400">›</span>
          </div>
          <div className="flex justify-between items-center px-5 py-4 hover:bg-[#fafaf7] cursor-pointer">
            <div>
              <div className="text-sm font-semibold text-gray-900">Unreconciled Items</div>
              <div className="text-xs text-gray-400 mt-0.5">Review &amp; reconcile settled transactions</div>
            </div>
            <span className="text-gray-400">›</span>
          </div>
        </div>
      </section>

      {/* Total Balance */}
      <section className="mb-9">
        <div className="bg-white rounded-xl px-5 py-5">
          <div className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-1">
            Total Balance
          </div>
          <div className="text-3xl font-bold text-gray-900">
            ${totalBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </div>
        </div>
      </section>

      {/* Accounts */}
      <section className="mb-9">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-base font-bold text-gray-900">Accounts</h2>
          <span className="text-sm text-[#1e3a6e] font-medium cursor-pointer">See all accounts →</span>
        </div>
        {accounts.length === 0 ? (
          <div className="bg-white rounded-xl px-5 py-8 text-center text-gray-400 text-sm">
            No accounts yet. Create one to get started.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {accounts.map((account) => (
              <AccountCard key={account.id} account={account} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
