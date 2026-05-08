import { TransactionStatus } from "@/types";

const statusStyles: Record<TransactionStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  authorized: "bg-blue-100 text-blue-800",
  settled: "bg-green-100 text-green-800",
  reconciled: "bg-indigo-100 text-indigo-800",
  failed: "bg-red-100 text-red-800",
};

interface BadgeProps {
  status: TransactionStatus;
}

export default function Badge({ status }: BadgeProps) {
  return (
    <span
      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}
