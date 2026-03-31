"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCampaignBuilder } from "@/stores/campaign-store";
import { WizardShell } from "@/components/onboarding/wizard-shell";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MultiSelect } from "@/components/forms/multi-select";
import { RangeSlider } from "@/components/forms/range-slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { CONTENT_VERTICALS, OBJECTIVES, PLATFORMS, CONTENT_FORMATS } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { Plus, Trash2, FileText } from "lucide-react";

const steps = ["Campaign Basics", "Deliverables", "Usage Rights & Budget", "Creator Requirements", "Review Scope"];

export default function CampaignBuilderPage() {
  const router = useRouter();
  const { step, data, setStep, updateData, addDeliverable, removeDeliverable } = useCampaignBuilder();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Temp deliverable state
  const [newDel, setNewDel] = useState({ contentType: "", quantity: 1, platform: "", description: "", revisionLimit: 2, usageRights: false, price: 0 });

  const handleNext = () => setStep(Math.min(step + 1, steps.length - 1));
  const handleBack = () => setStep(Math.max(step - 1, 0));

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await fetch("/api/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      router.push("/dashboard/business/campaigns");
    } catch {
      setIsSubmitting(false);
    }
  };

  return (
    <WizardShell
      steps={steps}
      currentStep={step}
      onNext={handleNext}
      onBack={handleBack}
      onSubmit={handleSubmit}
      isLastStep={step === steps.length - 1}
      isSubmitting={isSubmitting}
      canProceed={step === 0 ? data.name.length >= 3 : step === 1 ? data.deliverables.length > 0 : true}
    >
      {step === 0 && (
        <Card className="p-6 space-y-5">
          <h2 className="text-xl font-semibold">Campaign basics</h2>
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">Campaign Name *</label>
            <Input placeholder="e.g. Summer Fashion Launch" value={data.name} onChange={(e) => updateData({ name: e.target.value })} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">Description *</label>
            <Textarea placeholder="Describe your campaign goals and vision..." value={data.description} onChange={(e) => updateData({ description: e.target.value })} maxLength={500} showCount />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">Objective</label>
            <Select value={data.objective} onValueChange={(v) => updateData({ objective: v })}>
              <SelectTrigger><SelectValue placeholder="Select objective" /></SelectTrigger>
              <SelectContent>{OBJECTIVES.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary">Start Date</label>
              <Input type="date" value={data.startDate} onChange={(e) => updateData({ startDate: e.target.value })} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary">End Date</label>
              <Input type="date" value={data.endDate} onChange={(e) => updateData({ endDate: e.target.value })} />
            </div>
          </div>
        </Card>
      )}

      {step === 1 && (
        <Card className="p-6 space-y-5">
          <h2 className="text-xl font-semibold">Deliverables</h2>
          <p className="text-sm text-text-secondary">Define what you need from creators.</p>

          {data.deliverables.map((d, i) => (
            <div key={i} className="flex items-center gap-3 rounded-lg border border-border p-3 bg-surface-elevated">
              <div className="flex-1">
                <p className="text-sm font-medium">{d.contentType} on {d.platform}</p>
                <p className="text-xs text-text-secondary">Qty: {d.quantity} · {d.revisionLimit} revisions</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => removeDeliverable(i)}><Trash2 className="h-4 w-4 text-error" /></Button>
            </div>
          ))}

          <div className="space-y-3 rounded-lg border border-dashed border-border p-4">
            <p className="text-sm font-medium text-text-primary">Add deliverable</p>
            <div className="grid grid-cols-2 gap-3">
              <Select value={newDel.contentType} onValueChange={(v) => setNewDel({ ...newDel, contentType: v })}>
                <SelectTrigger><SelectValue placeholder="Content type" /></SelectTrigger>
                <SelectContent>{CONTENT_FORMATS.map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}</SelectContent>
              </Select>
              <Select value={newDel.platform} onValueChange={(v) => setNewDel({ ...newDel, platform: v })}>
                <SelectTrigger><SelectValue placeholder="Platform" /></SelectTrigger>
                <SelectContent>{PLATFORMS.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <Input type="number" placeholder="Qty" value={newDel.quantity} onChange={(e) => setNewDel({ ...newDel, quantity: Number(e.target.value) })} />
              <Input type="number" placeholder="Revisions" value={newDel.revisionLimit} onChange={(e) => setNewDel({ ...newDel, revisionLimit: Number(e.target.value) })} />
              <Input type="number" placeholder="₹ Price" value={newDel.price || ""} onChange={(e) => setNewDel({ ...newDel, price: Number(e.target.value) })} />
            </div>
            <Input placeholder="Description (optional)" value={newDel.description} onChange={(e) => setNewDel({ ...newDel, description: e.target.value })} />
            <Button
              variant="outline"
              size="sm"
              className="gap-1"
              disabled={!newDel.contentType || !newDel.platform}
              onClick={() => {
                addDeliverable(newDel);
                setNewDel({ contentType: "", quantity: 1, platform: "", description: "", revisionLimit: 2, usageRights: false, price: 0 });
              }}
            >
              <Plus className="h-3 w-3" /> Add
            </Button>
          </div>
        </Card>
      )}

      {step === 2 && (
        <Card className="p-6 space-y-5">
          <h2 className="text-xl font-semibold">Usage rights & budget</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-primary">Usage rights for paid ads</p>
              <p className="text-xs text-text-secondary">Adds ~20% to creator rates</p>
            </div>
            <Switch checked={data.usageRights} onCheckedChange={(v) => updateData({ usageRights: v })} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">Total Campaign Budget</label>
            <RangeSlider min={5000} max={1000000} value={data.budget} onChange={(v) => updateData({ budget: v })} step={5000} />
          </div>
          {data.deliverables.length > 0 && (
            <div className="rounded-lg bg-surface-elevated p-4">
              <p className="text-xs text-text-secondary uppercase tracking-wide mb-2">Auto-calculated breakdown</p>
              {data.deliverables.map((d, i) => (
                <div key={i} className="flex justify-between text-sm py-1">
                  <span>{d.contentType} x{d.quantity}</span>
                  <span className="font-mono">{formatCurrency(d.price || data.budget / data.deliverables.length)}</span>
                </div>
              ))}
            </div>
          )}
        </Card>
      )}

      {step === 3 && (
        <Card className="p-6 space-y-5">
          <h2 className="text-xl font-semibold">Creator requirements</h2>
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">Content Verticals</label>
            <MultiSelect options={CONTENT_VERTICALS} selected={data.targetVerticals} onChange={(v) => updateData({ targetVerticals: v })} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">Target Regions</label>
            <MultiSelect
              options={["Delhi NCR", "Mumbai", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune", "Jaipur", "Kerala", "Pan India"]}
              selected={data.targetRegions}
              onChange={(v) => updateData({ targetRegions: v })}
            />
          </div>
        </Card>
      )}

      {step === 4 && (
        <Card className="p-6 space-y-5">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="h-5 w-5 text-accent" />
            <h2 className="text-xl font-semibold">Scope Card</h2>
          </div>
          <p className="text-xs text-text-secondary">This is your campaign contract. Both sides will review before agreeing.</p>

          <div className="space-y-4 divide-y divide-border">
            <div className="pt-2">
              <p className="text-xs text-text-secondary uppercase tracking-wide">Campaign</p>
              <p className="text-sm font-medium">{data.name}</p>
              <p className="text-xs text-text-secondary mt-1">{data.description}</p>
            </div>
            <div className="pt-4">
              <p className="text-xs text-text-secondary uppercase tracking-wide mb-2">Deliverables</p>
              {data.deliverables.map((d, i) => (
                <div key={i} className="flex justify-between text-sm py-1.5 border-b border-border last:border-0">
                  <span>{d.contentType} on {d.platform} (x{d.quantity})</span>
                  <span className="text-text-secondary">{d.revisionLimit} revisions</span>
                </div>
              ))}
            </div>
            <div className="pt-4 flex justify-between">
              <span className="text-sm font-medium">Total Budget</span>
              <span className="text-sm font-mono font-semibold text-accent">{formatCurrency(data.budget)}</span>
            </div>
            <div className="pt-4 flex justify-between">
              <span className="text-sm">Usage Rights</span>
              <Badge variant={data.usageRights ? "accent" : "default"}>{data.usageRights ? "Included" : "Not included"}</Badge>
            </div>
            <div className="pt-4">
              <span className="text-sm">Timeline: {data.startDate || "TBD"} — {data.endDate || "TBD"}</span>
            </div>
          </div>
        </Card>
      )}
    </WizardShell>
  );
}
