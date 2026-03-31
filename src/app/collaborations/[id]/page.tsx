"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { formatCurrency, formatDate } from "@/lib/utils";
import { InnerNav } from "@/components/layout/inner-nav";
import {
  FileText, Upload, MessageSquare, Clock, IndianRupee, BarChart3,
  CheckCircle, AlertCircle, ArrowRight, Send, Paperclip,
} from "lucide-react";

// Mock collaboration data
const mockCollab = {
  id: "collab-1",
  campaign: { name: "Summer Fashion Collection Launch", business: "StyleCraft" },
  creator: { name: "Priya Sharma", avatar: null },
  status: "IN_PROGRESS",
  matchScore: 92,
  scopeCard: {
    deliverables: [
      { contentType: "Reels", quantity: 3, platform: "Instagram", revisionLimit: 2, price: 12000, status: "approved" },
      { contentType: "Stories", quantity: 5, platform: "Instagram", revisionLimit: 1, price: 5000, status: "in_progress" },
      { contentType: "Photography", quantity: 10, platform: "Instagram", revisionLimit: 2, price: 8000, status: "pending" },
    ],
    totalBudget: 61000,
    usageRights: true,
    timeline: { start: "2026-03-01", end: "2026-04-15" },
  },
  currentRevision: 1,
  timeline: [
    { type: "INVITED", description: "StyleCraft invited Priya to collaborate", date: "2026-02-25" },
    { type: "ACCEPTED", description: "Priya accepted the collaboration", date: "2026-02-26" },
    { type: "BRIEF_SENT", description: "StyleCraft shared the creative brief", date: "2026-02-28" },
    { type: "DRAFT_SUBMITTED", description: "Priya submitted first draft for Reels", date: "2026-03-05" },
    { type: "FEEDBACK", description: "StyleCraft provided feedback on draft", date: "2026-03-06" },
    { type: "APPROVED", description: "Reels content approved", date: "2026-03-08" },
  ],
  files: [
    { name: "brand-guidelines.pdf", type: "BRIEF", uploadedBy: "StyleCraft", date: "2026-02-28" },
    { name: "mood-board-v1.jpg", type: "MOOD_BOARD", uploadedBy: "StyleCraft", date: "2026-02-28" },
    { name: "reel-draft-1.mp4", type: "DRAFT", uploadedBy: "Priya Sharma", date: "2026-03-05" },
    { name: "reel-final.mp4", type: "FINAL", uploadedBy: "Priya Sharma", date: "2026-03-08" },
  ],
  payment: { amount: 61000, status: "ESCROW", milestones: [{ label: "50% on approval", amount: 30500, released: true }, { label: "50% on publish", amount: 30500, released: false }] },
};

export default function CollaborationWorkspacePage() {
  const params = useParams();
  const collab = mockCollab;
  const [feedbackText, setFeedbackText] = useState("");

  const statusColors: Record<string, string> = {
    INVITED: "bg-surface-elevated",
    ACCEPTED: "bg-accent/10",
    BRIEFING: "bg-warning/10",
    IN_PROGRESS: "bg-accent/10",
    REVIEW: "bg-warning/10",
    COMPLETED: "bg-success/10",
    DECLINED: "bg-error/10",
  };

  return (
    <div className="min-h-screen bg-background">
      <InnerNav />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-6"
      >
        <div>
          <h1 className="text-2xl font-semibold text-text-primary">{collab.campaign.name}</h1>
          <div className="flex items-center gap-3 mt-1 text-sm text-text-secondary">
            <span>{collab.campaign.business}</span>
            <span>·</span>
            <span className="flex items-center gap-1"><Avatar name={collab.creator.name} size="sm" /> {collab.creator.name}</span>
          </div>
        </div>
        <Badge variant="accent" className="text-sm py-1 px-3">{collab.status.replace("_", " ")}</Badge>
      </motion.div>

      {/* Tabs */}
      <Tabs defaultValue="scope">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="scope" className="gap-1"><FileText className="h-3.5 w-3.5" /> Scope</TabsTrigger>
          <TabsTrigger value="files" className="gap-1"><Upload className="h-3.5 w-3.5" /> Files</TabsTrigger>
          <TabsTrigger value="feedback" className="gap-1"><MessageSquare className="h-3.5 w-3.5" /> Feedback</TabsTrigger>
          <TabsTrigger value="timeline" className="gap-1"><Clock className="h-3.5 w-3.5" /> Timeline</TabsTrigger>
          <TabsTrigger value="payment" className="gap-1"><IndianRupee className="h-3.5 w-3.5" /> Payment</TabsTrigger>
          <TabsTrigger value="performance" className="gap-1"><BarChart3 className="h-3.5 w-3.5" /> Performance</TabsTrigger>
        </TabsList>

        {/* Scope Tab */}
        <TabsContent value="scope">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="h-5 w-5 text-accent" />
              <CardTitle>Scope Contract</CardTitle>
              <Badge variant="success" className="ml-2">Signed</Badge>
            </div>
            <div className="space-y-4">
              {collab.scopeCard.deliverables.map((d, i) => (
                <div key={i} className="flex items-center gap-3 rounded-lg border border-border p-4">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center ${d.status === "approved" ? "bg-success/10" : d.status === "in_progress" ? "bg-accent/10" : "bg-surface-elevated"}`}>
                    {d.status === "approved" ? <CheckCircle className="h-4 w-4 text-success" /> : <span className="text-xs font-medium text-text-secondary">{i + 1}</span>}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-text-primary">{d.contentType} x{d.quantity} on {d.platform}</p>
                    <p className="text-xs text-text-secondary">{d.revisionLimit} revisions included</p>
                  </div>
                  <span className="font-mono text-sm">{formatCurrency(d.price)}</span>
                  <Badge variant={d.status === "approved" ? "success" : d.status === "in_progress" ? "accent" : "default"}>
                    {d.status}
                  </Badge>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between">
                <span className="font-medium">Total</span>
                <span className="font-mono font-semibold text-accent">{formatCurrency(collab.scopeCard.totalBudget)}</span>
              </div>
              <div className="flex justify-between text-sm text-text-secondary">
                <span>Usage Rights</span>
                <Badge variant={collab.scopeCard.usageRights ? "accent" : "default"}>
                  {collab.scopeCard.usageRights ? "Included" : "Not included"}
                </Badge>
              </div>
              <Button variant="outline" className="w-full mt-2">Request Scope Change</Button>
            </div>
          </Card>
        </TabsContent>

        {/* Files Tab */}
        <TabsContent value="files">
          <Card className="p-6">
            <CardTitle className="mb-4">Briefs & Files</CardTitle>
            <div className="space-y-2">
              {collab.files.map((file, i) => (
                <div key={i} className="flex items-center gap-3 rounded-lg border border-border p-3 hover:bg-surface-elevated transition-colors">
                  <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Paperclip className="h-4 w-4 text-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-text-primary">{file.name}</p>
                    <p className="text-xs text-text-secondary">{file.uploadedBy} · {file.date}</p>
                  </div>
                  <Badge variant="outline">{file.type.replace("_", " ")}</Badge>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 gap-2"><Upload className="h-4 w-4" /> Upload File</Button>
          </Card>
        </TabsContent>

        {/* Feedback Tab */}
        <TabsContent value="feedback">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <CardTitle>Feedback</CardTitle>
              <Badge variant="accent">Revision {collab.currentRevision} of 2</Badge>
            </div>
            <div className="space-y-4 mb-4">
              <div className="rounded-lg bg-surface-elevated p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Avatar name="StyleCraft" size="sm" />
                  <span className="text-sm font-medium">StyleCraft</span>
                  <span className="text-xs text-text-secondary">Mar 6, 2026</span>
                </div>
                <p className="text-sm text-text-secondary">Love the concept! Can we adjust the color grading to be warmer? Also, the product should appear within the first 3 seconds of the Reel.</p>
              </div>
              <div className="rounded-lg bg-accent/5 border border-accent/10 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Avatar name="Priya Sharma" size="sm" />
                  <span className="text-sm font-medium">Priya Sharma</span>
                  <span className="text-xs text-text-secondary">Mar 7, 2026</span>
                </div>
                <p className="text-sm text-text-secondary">Done! Updated the color grading and moved the product reveal to the first 2 seconds. Uploaded the revised version.</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Textarea
                placeholder="Add feedback..."
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                className="flex-1"
              />
              <Button className="self-end gap-1"><Send className="h-4 w-4" /></Button>
            </div>
          </Card>
        </TabsContent>

        {/* Timeline Tab */}
        <TabsContent value="timeline">
          <Card className="p-6">
            <CardTitle className="mb-4">Collaboration Timeline</CardTitle>
            <div className="space-y-0">
              {collab.timeline.map((event, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="h-3 w-3 rounded-full bg-accent mt-1.5" />
                    {i < collab.timeline.length - 1 && <div className="w-px flex-1 bg-border" />}
                  </div>
                  <div className="pb-6">
                    <p className="text-sm font-medium text-text-primary">{event.description}</p>
                    <p className="text-xs text-text-secondary mt-0.5">{formatDate(event.date)}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Payment Tab */}
        <TabsContent value="payment">
          <Card className="p-6">
            <CardTitle className="mb-4">Payment</CardTitle>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-2xl font-semibold font-mono text-text-primary">{formatCurrency(collab.payment.amount)}</p>
                <p className="text-sm text-text-secondary">Total amount</p>
              </div>
              <Badge variant={collab.payment.status === "ESCROW" ? "warning" : "success"} className="text-sm py-1 px-3">
                {collab.payment.status}
              </Badge>
            </div>
            <Separator className="my-4" />
            <div className="space-y-3">
              {collab.payment.milestones.map((m, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div className="flex items-center gap-3">
                    {m.released ? (
                      <CheckCircle className="h-5 w-5 text-success" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-warning" />
                    )}
                    <div>
                      <p className="text-sm font-medium text-text-primary">{m.label}</p>
                      <p className="text-xs text-text-secondary">{m.released ? "Released" : "Pending"}</p>
                    </div>
                  </div>
                  <span className="font-mono text-sm">{formatCurrency(m.amount)}</span>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline">Release Payment</Button>
          </Card>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance">
          <Card className="p-6">
            <CardTitle className="mb-4">Campaign Performance</CardTitle>
            <p className="text-sm text-text-secondary">Performance data will be available after the campaign is published.</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
              {[
                { label: "Reach", value: "—" },
                { label: "Engagement", value: "—" },
                { label: "Click-through", value: "—" },
                { label: "ROI", value: "—" },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-4 rounded-lg bg-surface-elevated">
                  <p className="text-lg font-semibold font-mono text-text-primary">{stat.value}</p>
                  <p className="text-xs text-text-secondary">{stat.label}</p>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
      </div>
    </div>
  );
}
