"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Calendar, Users, IndianRupee, ArrowRight } from "lucide-react";
import Link from "next/link";

interface CampaignCardProps {
  id: string;
  name: string;
  status: string;
  budget: number;
  startDate: string;
  endDate: string;
  creatorsCount?: number;
  progress?: number;
  matchScore?: number;
  matchReason?: string;
  role: "creator" | "business";
}

const statusVariant: Record<string, "success" | "warning" | "accent" | "default"> = {
  ACTIVE: "success",
  DRAFT: "default",
  PAUSED: "warning",
  COMPLETED: "accent",
};

export function CampaignCard({
  id, name, status, budget, startDate, endDate, creatorsCount, progress, matchScore, matchReason, role,
}: CampaignCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-border bg-surface p-5 hover:shadow-md transition-all duration-200"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-text-primary">{name}</h3>
          <div className="flex items-center gap-3 mt-1 text-xs text-text-secondary">
            <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{formatDate(startDate)}</span>
            <span className="flex items-center gap-1"><IndianRupee className="h-3 w-3" />{formatCurrency(budget)}</span>
          </div>
        </div>
        <Badge variant={statusVariant[status] || "default"}>{status}</Badge>
      </div>

      {matchScore !== undefined && (
        <div className="mb-3 rounded-lg bg-accent/5 border border-accent/10 px-3 py-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-accent font-mono">{matchScore}% match</span>
          </div>
          {matchReason && <p className="text-xs text-text-secondary mt-1">{matchReason}</p>}
        </div>
      )}

      {progress !== undefined && (
        <div className="mb-3">
          <div className="flex justify-between text-xs text-text-secondary mb-1">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-surface-elevated overflow-hidden">
            <div
              className="h-full rounded-full bg-accent transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {creatorsCount !== undefined && (
        <div className="flex items-center gap-1 text-xs text-text-secondary mb-3">
          <Users className="h-3 w-3" /> {creatorsCount} creators
        </div>
      )}

      <Link href={role === "business" ? `/dashboard/business/campaigns/${id}` : `/dashboard/creator/campaigns/${id}`}>
        <Button variant="ghost" size="sm" className="w-full gap-1">
          View Details <ArrowRight className="h-3 w-3" />
        </Button>
      </Link>
    </motion.div>
  );
}
