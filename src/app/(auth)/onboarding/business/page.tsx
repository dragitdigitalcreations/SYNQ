"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useBusinessOnboarding } from "@/stores/onboarding-store";
import { WizardShell } from "@/components/onboarding/wizard-shell";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/forms/multi-select";
import { RangeSlider } from "@/components/forms/range-slider";
import { FileUpload } from "@/components/forms/file-upload";
import { Badge } from "@/components/ui/badge";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { CONTENT_VERTICALS, OBJECTIVES, INDUSTRIES } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { Building2, Globe, Mail, CheckCircle } from "lucide-react";

const steps = [
  "Company Info",
  "Campaign Goals",
  "Audience Target",
  "Verification",
  "Review & Submit",
];

export default function BusinessOnboardingPage() {
  const router = useRouter();
  const { step, data, setStep, updateData } = useBusinessOnboarding();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const handleNext = () => setStep(Math.min(step + 1, steps.length - 1));
  const handleBack = () => setStep(Math.max(step - 1, 0));

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await fetch("/api/businesses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      router.push("/dashboard/business");
    } catch {
      setIsSubmitting(false);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 0: return data.companyName.length >= 2 && data.industry.length > 0;
      case 1: return data.campaignGoals.length > 0;
      case 2: return true;
      case 3: return true;
      case 4: return true;
      default: return true;
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
      canProceed={canProceed()}
    >
      {step === 0 && (
        <Card className="p-6 space-y-5">
          <h2 className="text-xl font-semibold">Company information</h2>
          <FileUpload
            onFileSelect={(file) => {
              const url = URL.createObjectURL(file);
              setLogoPreview(url);
              updateData({ logo: url });
            }}
            preview={logoPreview}
            onRemove={() => { setLogoPreview(null); updateData({ logo: "" }); }}
            label="Upload company logo"
          />
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">Brand Name *</label>
            <Input
              placeholder="Your company name"
              value={data.companyName}
              onChange={(e) => updateData({ companyName: e.target.value })}
              icon={<Building2 className="h-4 w-4" />}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">Website</label>
            <Input
              placeholder="https://yourcompany.com"
              value={data.website}
              onChange={(e) => updateData({ website: e.target.value })}
              icon={<Globe className="h-4 w-4" />}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">Industry *</label>
            <Select value={data.industry} onValueChange={(v) => updateData({ industry: v })}>
              <SelectTrigger><SelectValue placeholder="Select industry" /></SelectTrigger>
              <SelectContent>
                {INDUSTRIES.map((i) => <SelectItem key={i} value={i}>{i}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">Company Size</label>
            <Select value={data.companySize} onValueChange={(v) => updateData({ companySize: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="SOLO">Solo / Freelancer</SelectItem>
                <SelectItem value="STARTUP">Startup (1-50)</SelectItem>
                <SelectItem value="SMB">SMB (50-500)</SelectItem>
                <SelectItem value="ENTERPRISE">Enterprise (500+)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>
      )}

      {step === 1 && (
        <Card className="p-6 space-y-5">
          <h2 className="text-xl font-semibold">What are your campaign goals?</h2>
          <MultiSelect
            options={OBJECTIVES}
            selected={data.campaignGoals}
            onChange={(v) => updateData({ campaignGoals: v })}
            placeholder="Select your goals"
          />
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">Budget range per campaign</label>
            <RangeSlider
              min={5000}
              max={1000000}
              value={data.budgetRange}
              onChange={(v) => updateData({ budgetRange: v })}
              step={5000}
            />
          </div>
        </Card>
      )}

      {step === 2 && (
        <Card className="p-6 space-y-5">
          <h2 className="text-xl font-semibold">Target audience</h2>
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">Target Content Verticals</label>
            <MultiSelect
              options={CONTENT_VERTICALS}
              selected={data.targetVerticals}
              onChange={(v) => updateData({ targetVerticals: v })}
              placeholder="What topics should creators cover?"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary">Age Range</label>
              <div className="flex gap-2 items-center">
                <Input
                  type="number"
                  value={data.targetAgeRange.min}
                  onChange={(e) => updateData({ targetAgeRange: { ...data.targetAgeRange, min: Number(e.target.value) } })}
                  className="w-20"
                />
                <span className="text-text-secondary">to</span>
                <Input
                  type="number"
                  value={data.targetAgeRange.max}
                  onChange={(e) => updateData({ targetAgeRange: { ...data.targetAgeRange, max: Number(e.target.value) } })}
                  className="w-20"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary">Gender</label>
              <Select value={data.targetGender} onValueChange={(v) => updateData({ targetGender: v })}>
                <SelectTrigger><SelectValue placeholder="Any" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>
      )}

      {step === 3 && (
        <Card className="p-6 space-y-5">
          <h2 className="text-xl font-semibold">Verification</h2>
          <p className="text-sm text-text-secondary">Verified businesses get 3x more responses from creators.</p>
          <div className="flex items-start gap-3 rounded-lg border border-border p-4 bg-surface-elevated">
            <Mail className="h-5 w-5 text-accent mt-0.5" />
            <div>
              <p className="text-sm font-medium text-text-primary">Email Verified</p>
              <p className="text-xs text-text-secondary">Your email has been verified during registration.</p>
            </div>
            <CheckCircle className="h-5 w-5 text-success ml-auto" />
          </div>
          <div className="flex items-start gap-3 rounded-lg border border-dashed border-border p-4">
            <Building2 className="h-5 w-5 text-text-secondary mt-0.5" />
            <div>
              <p className="text-sm font-medium text-text-primary">GST / PAN Verification</p>
              <p className="text-xs text-text-secondary">Optional — adds a verified badge to your profile.</p>
              <Input placeholder="GST or PAN number" className="mt-2" />
            </div>
          </div>
        </Card>
      )}

      {step === 4 && (
        <Card className="p-6 space-y-5">
          <h2 className="text-xl font-semibold">Review your profile</h2>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-text-secondary uppercase tracking-wide">Company</p>
              <p className="text-sm font-medium">{data.companyName}</p>
            </div>
            <div>
              <p className="text-xs text-text-secondary uppercase tracking-wide">Industry</p>
              <p className="text-sm font-medium">{data.industry}</p>
            </div>
            <div>
              <p className="text-xs text-text-secondary uppercase tracking-wide">Size</p>
              <p className="text-sm font-medium">{data.companySize}</p>
            </div>
            <div>
              <p className="text-xs text-text-secondary uppercase tracking-wide mb-1">Goals</p>
              <div className="flex flex-wrap gap-1">
                {data.campaignGoals.map((g) => <Badge key={g} variant="accent">{g}</Badge>)}
              </div>
            </div>
            <div>
              <p className="text-xs text-text-secondary uppercase tracking-wide">Budget Range</p>
              <p className="text-sm font-mono font-medium text-accent">{formatCurrency(data.budgetRange)}</p>
            </div>
            {data.targetVerticals.length > 0 && (
              <div>
                <p className="text-xs text-text-secondary uppercase tracking-wide mb-1">Target Verticals</p>
                <div className="flex flex-wrap gap-1">
                  {data.targetVerticals.map((v) => <Badge key={v} variant="outline">{v}</Badge>)}
                </div>
              </div>
            )}
          </div>
        </Card>
      )}
    </WizardShell>
  );
}
