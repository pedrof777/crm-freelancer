"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/clientes", label: "Clientes" },
  { href: "/orcamentos", label: "Orçamentos" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 min-h-screen border-r border-gray-800 p-6 flex flex-col gap-1">
      <Link href={"/"} className="font-mono text-sm text-emerald-400 mb-6">
        {"crm-freelancer"}
      </Link>

      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`text-sm px-3 py-2 rounded-md transition-colors${
              isActive
                ? "bg-emerald-500/10 text-emerald-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </aside>
  );
}
