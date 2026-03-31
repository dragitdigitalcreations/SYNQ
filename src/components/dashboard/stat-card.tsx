"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  change?: { value: string; positive: boolean };
  icon?: React.ReactNode;
}

export function StatCard({ label, value, change, icon }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-border bg-surface p-6"
    >
      <div className="flex items-center justify-between">
        <p className="text-sm text-text-secondary">{label}</p>
        {icon && <div className="text-text-secondary">{icon}</div>}
      </div>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-text-primary font-mono">
        {value}
      </p>
      {change && (
        <div className={cn(
          "mt-1 flex items-center gap-1 text-xs font-medium",
          change.positive ? "text-success" : "text-error"
        )}>
          {change.positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          {change.value}
        </div>
      )}
    </motion.div>
  );
}
