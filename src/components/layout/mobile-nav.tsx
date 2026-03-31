"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { SidebarItem } from "./sidebar";

interface MobileNavProps {
  items: SidebarItem[];
}

export function MobileNav({ items }: MobileNavProps) {
  const pathname = usePathname();
  const visibleItems = items.slice(0, 5);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around glass shadow-[0_-1px_3px_rgba(0,0,0,0.06)] px-2 py-2 pb-[env(safe-area-inset-bottom,8px)] md:hidden">
      {visibleItems.map((item) => {
        const isHome = item.href === "/dashboard/creator" || item.href === "/dashboard/business";
        const isActive = isHome
          ? pathname === item.href
          : pathname === item.href || pathname.startsWith(item.href + "/");
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-0.5 rounded-[10px] px-3 py-1 text-[10px] font-medium transition-colors min-w-[44px] min-h-[50px] justify-center",
              isActive ? "text-accent" : "text-text-secondary"
            )}
          >
            <span className="shrink-0">{item.icon}</span>
            <span className="truncate">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
