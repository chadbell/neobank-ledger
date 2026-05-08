"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Home", href: "/", icon: "⌂" },
  { label: "Accounts", href: "/accounts", icon: "⊟" },
  { label: "Deposit", href: "/deposit", icon: "↓" },
  { label: "Transactions", href: "/transactions", icon: "$" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[220px] bg-[#1e3a6e] flex flex-col flex-shrink-0 h-screen">
      {/* Logo */}
      <div className="px-6 py-7 border-b border-white/10">
        <span className="text-white text-2xl font-extrabold italic tracking-tight">
          Bellvault
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-6 py-3 text-sm transition-colors ${
                isActive
                  ? "text-white bg-white/10"
                  : "text-white/60 hover:text-white/90 hover:bg-white/5"
              }`}
            >
              <span className="w-4 text-center">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-white/10">
        <div className="text-white text-sm font-semibold">Chad Bell</div>
        <div className="text-white/50 text-xs mt-0.5">Bellvault Admin</div>
      </div>
    </aside>
  );
}
