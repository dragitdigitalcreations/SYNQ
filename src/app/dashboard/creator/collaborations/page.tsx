"use client";

import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { formatCurrency, formatDate } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const mockCollabs = [
  { id: "1", campaign: "Summer Fashion Collection", brand: "StyleCraft", status: "IN_PROGRESS", budget: 61000, deadline: "2026-04-15" },
  { id: "2", campaign: "Fitness App Launch", brand: "FitLife Studio", status: "BRIEFING", budget: 25000, deadline: "2026-04-10" },
  { id: "3", campaign: "Diwali Special", brand: "FreshBites", status: "COMPLETED", budget: 35000, deadline: "2025-11-15" },
  { id: "4", campaign: "Tech Review Series", brand: "TechGear India", status: "INVITED", budget: 40000, deadline: "2026-03-31" },
];

const statusVariant: Record<string, "success" | "warning" | "accent" | "default" | "error"> = {
  INVITED: "default",
  ACCEPTED: "accent",
  BRIEFING: "warning",
  IN_PROGRESS: "accent",
  REVIEW: "warning",
  COMPLETED: "success",
  DECLINED: "error",
};

export default function CollaborationsPage() {
  return (
    <div>
      <PageHeader title="My Collaborations" description="Track your active and past collaborations" />
      <div className="space-y-3">
        {mockCollabs.map((collab) => (
          <Card key={collab.id} className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar name={collab.brand} size="md" />
                <div>
                  <p className="text-sm font-medium text-text-primary">{collab.campaign}</p>
                  <p className="text-xs text-text-secondary">{collab.brand} · Due {formatDate(collab.deadline)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-mono text-text-secondary">{formatCurrency(collab.budget)}</span>
                <Badge variant={statusVariant[collab.status]}>{collab.status.replace("_", " ")}</Badge>
                <Link href={`/collaborations/${collab.id}`}>
                  <Button variant="ghost" size="sm"><ArrowRight className="h-4 w-4" /></Button>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
