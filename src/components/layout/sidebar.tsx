"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/components/theme-provider";

export interface SidebarItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  items: SidebarItem[];
  role: "creator" | "business";
}

export function Sidebar({ items, role }: SidebarProps) {
  const pathname = usePathname();
  const { theme } = useTheme();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 256 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="hidden md:flex flex-col h-screen sticky top-0 glass shadow-sm"
    >
      <div className="flex items-center gap-2 px-4 h-16 border-b border-border/50">
        <AnimatePresence>
          {!collapsed ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="whitespace-nowrap"
            >
              <Image
                src={theme === "dark" ? "/synq logo night mode.png" : "/synq logo light mode.png"}
                alt="SYNQ"
                width={90}
                height={28}
                className="h-6 w-auto object-contain"
              />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-[#00B8D9]"
            >
              <span className="text-xs font-bold text-white">SQ</span>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto p-1 rounded-md text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
        </button>
      </div>

      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {items.map((item) => {
          // Exact match for "Home" dashboard roots, prefix match for sub-sections
          const isHome = item.href === "/dashboard/creator" || item.href === "/dashboard/business";
          const isActive = isHome
            ? pathname === item.href
            : pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-[14px] font-medium min-h-[44px] transition-all duration-200",
                isActive
                  ? "bg-accent/10 text-accent"
                  : "text-text-secondary hover:text-text-primary hover:bg-surface-elevated"
              )}
            >
              <span className="shrink-0">{item.icon}</span>
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </nav>

      <div className="p-2 border-t border-border/50">
        <div className={cn(
          "flex items-center gap-3 px-3 py-2 rounded-lg",
          "text-xs text-text-secondary"
        )}>
          <div className={cn(
            "h-2 w-2 rounded-full",
            role === "creator" ? "bg-accent" : "bg-success"
          )} />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {role === "creator" ? "Creator" : "Business"} Account
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.aside>
  );
}
