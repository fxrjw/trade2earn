"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/signals", label: "Signals" },
  { href: "/creator", label: "Creator" }
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <nav className="sticky top-0 z-50 backdrop-blur border-b border-white/10">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-6">
        <div className="font-bold tracking-tight">Trade2Earn</div>
        <div className="flex items-center gap-4 text-sm">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "hover:text-white/90",
                pathname === l.href ? "text-white" : "text-white/60"
              )}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
