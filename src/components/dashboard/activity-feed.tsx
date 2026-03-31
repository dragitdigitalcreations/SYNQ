"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils";

interface ActivityItem {
  id: string;
  type: "collab" | "payment" | "message" | "review";
  title: string;
  description: string;
  time: string;
}

const typeColors = {
  collab: "bg-accent",
  payment: "bg-success",
  message: "bg-warning",
  review: "bg-[#00B8D9]",
};

interface ActivityFeedProps {
  items: ActivityItem[];
}

export function ActivityFeed({ items }: ActivityFeedProps) {
  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
          className="flex gap-3"
        >
          <div className="flex flex-col items-center">
            <div className={cn("h-2 w-2 rounded-full mt-2", typeColors[item.type])} />
            {i < items.length - 1 && <div className="w-px flex-1 bg-border mt-1" />}
          </div>
          <div className="pb-4">
            <p className="text-sm font-medium text-text-primary">{item.title}</p>
            <p className="text-xs text-text-secondary">{item.description}</p>
            <p className="text-xs text-text-secondary mt-1">{item.time}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
