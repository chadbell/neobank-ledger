import { Account } from "@/types";

const typeStyles: Record<string, string> = {
  consumer: "bg-blue-100 text-blue-800",
  merchant: "bg-purple-100 text-purple-800",
  external: "bg-gray-100 text-gray-600",
};

interface AccountCardProps {
  account: Account;
}

export default function AccountCard({ account }: AccountCardProps) {
  return (
    <div className="bg-white rounded-xl p-5">
      <div className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-1">
        {account.account_type}
      </div>
      <div className="text-base font-bold text-gray-900 mb-3">
        {account.owner_name}
      </div>
      <div className="text-2xl font-bold text-gray-900">
        ${account.balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
      </div>
      <div className="text-[10px] text-gray-300 font-mono mt-2">
        {account.id.slice(0, 8)}...
      </div>
      <span
        className={`inline-block mt-2 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide ${typeStyles[account.account_type]}`}
      >
        {account.account_type}
      </span>
    </div>
  );
}
