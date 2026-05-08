import { Transaction } from "@/types";
import Badge from "@/components/ui/Badge";

const typeIcon: Record<string, string> = {
  deposit: "🏦",
  withdrawal: "↑",
  transfer: "⇄",
};

interface TransactionRowProps {
  transaction: Transaction;
}

export default function TransactionRow({ transaction }: TransactionRowProps) {
  const isCredit = transaction.transaction_type === "deposit";
  const formattedAmount = `${isCredit ? "+" : "-"} $${transaction.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
  const formattedDate = new Date(transaction.timestamp).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="grid grid-cols-[40px_1fr_auto_auto_auto] gap-3 items-center px-5 py-4 border-b border-[#f0ede6] last:border-0 hover:bg-[#fafaf7] cursor-pointer transition-colors">
      <div className="w-9 h-9 bg-[#f0ede6] rounded-full flex items-center justify-center text-sm">
        {typeIcon[transaction.transaction_type]}
      </div>
      <div>
        <div className="text-sm font-semibold text-gray-900">
          {transaction.description ?? transaction.transaction_type}
        </div>
        <div className="text-xs text-gray-400 mt-0.5 capitalize">
          {transaction.transaction_type}
        </div>
      </div>
      <div className="text-xs text-gray-400 whitespace-nowrap">{formattedDate}</div>
      <Badge status={transaction.status} />
      <div className={`text-sm font-bold whitespace-nowrap ${isCredit ? "text-green-600" : "text-gray-900"}`}>
        {formattedAmount}
      </div>
    </div>
  );
}
