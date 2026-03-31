"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreatorOnboarding } from "@/stores/onboarding-store";
import { WizardShell } from "@/components/onboarding/wizard-shell";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MultiSelect } from "@/components/forms/multi-select";
import { RangeSlider } from "@/components/forms/range-slider";
import { FileUpload } from "@/components/forms/file-upload";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { CONTENT_VERTICALS, CONTENT_FORMATS, EXCLUDED_CATEGORIES } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { Instagram, Youtube, Twitter, MapPin, User } from "lucide-react";

const steps = [
  "Basic Info",
  "Social Connect",
  "Content Profile",
  "Collaboration Preferences",
  "Rate Card",
  "Review & Submit",
];

export default function CreatorOnboardingPage() {
  const router = useRouter();
  const { step, data, setStep, updateData } = useCreatorOnboarding();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const handleNext = () => setStep(Math.min(step + 1, steps.length - 1));
  const handleBack = () => setStep(Math.max(step - 1, 0));

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await fetch("/api/creators", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      router.push("/dashboard/creator");
    } catch {
      setIsSubmitting(false);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 0: return data.name.length >= 2;
      case 1: return true;
      case 2: return data.contentVerticals.length > 0 && data.contentFormats.length > 0;
      case 3: return true;
      case 4: return true;
      case 5: return true;
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
          <h2 className="text-xl font-semibold">Tell us about yourself</h2>
          <FileUpload
            onFileSelect={(file) => {
              const url = URL.createObjectURL(file);
              setAvatarPreview(url);
              updateData({ avatar: url });
            }}
            preview={avatarPreview}
            onRemove={() => { setAvatarPreview(null); updateData({ avatar: "" }); }}
            label="Upload profile photo"
          />
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">Full Name *</label>
            <Input
              placeholder="Your name"
              value={data.name}
              onChange={(e) => updateData({ name: e.target.value })}
              icon={<User className="h-4 w-4" />}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">Location</label>
            <Input
              placeholder="City, State"
              value={data.location}
              onChange={(e) => updateData({ location: e.target.value })}
              icon={<MapPin className="h-4 w-4" />}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">Bio</label>
            <Textarea
              placeholder="Tell brands what makes you unique..."
              value={data.bio}
              onChange={(e) => updateData({ bio: e.target.value })}
              maxLength={280}
              showCount
            />
          </div>
        </Card>
      )}

      {step === 1 && (
        <Card className="p-6 space-y-5">
          <h2 className="text-xl font-semibold">Connect your platforms</h2>
          <p className="text-sm text-text-secondary">We&apos;ll use your existing analytics to build your profile.</p>
          {[
            { key: "instagram" as const, icon: Instagram, label: "Instagram", placeholder: "https://instagram.com/username" },
            { key: "youtube" as const, icon: Youtube, label: "YouTube", placeholder: "https://youtube.com/@channel" },
            { key: "twitter" as const, icon: Twitter, label: "Twitter / X", placeholder: "https://x.com/username" },
            { key: "tiktok" as const, icon: () => <span className="text-sm font-bold">TT</span>, label: "TikTok", placeholder: "https://tiktok.com/@username" },
          ].map((platform) => (
            <div key={platform.key} className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-text-primary">
                <platform.icon className="h-4 w-4" /> {platform.label}
              </label>
              <Input
                placeholder={platform.placeholder}
                value={data.socialLinks[platform.key]}
                onChange={(e) =>
                  updateData({
                    socialLinks: { ...data.socialLinks, [platform.key]: e.target.value },
                  })
                }
              />
            </div>
          ))}
        </Card>
      )}

      {step === 2 && (
        <Card className="p-6 space-y-5">
          <h2 className="text-xl font-semibold">Your content profile</h2>
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">Content Verticals *</label>
            <p className="text-xs text-text-secondary">What topics do you create content about?</p>
            <MultiSelect
              options={CONTENT_VERTICALS}
              selected={data.contentVerticals}
              onChange={(v) => updateData({ contentVerticals: v })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">Content Formats *</label>
            <p className="text-xs text-text-secondary">What types of content do you create?</p>
            <MultiSelect
              options={CONTENT_FORMATS}
              selected={data.contentFormats}
              onChange={(v) => updateData({ contentFormats: v })}
            />
          </div>
        </Card>
      )}

      {step === 3 && (
        <Card className="p-6 space-y-5">
          <h2 className="text-xl font-semibold">Collaboration preferences</h2>
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">Minimum Budget</label>
            <RangeSlider
              min={500}
              max={500000}
              value={data.minBudget}
              onChange={(v) => updateData({ minBudget: v })}
              step={500}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">Brands I won&apos;t work with</label>
            <MultiSelect
              options={EXCLUDED_CATEGORIES}
              selected={data.excludedCategories}
              onChange={(v) => updateData({ excludedCategories: v })}
              placeholder="Select categories you want to exclude"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-primary">Availability</p>
              <p className="text-xs text-text-secondary">Are you open to new collaborations?</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-text-secondary">
                {data.availability === "OPEN" ? "Open" : data.availability === "SELECTIVE" ? "Selective" : "Unavailable"}
              </span>
              <Switch
                checked={data.availability === "OPEN"}
                onCheckedChange={(checked) =>
                  updateData({ availability: checked ? "OPEN" : "SELECTIVE" })
                }
              />
            </div>
          </div>
        </Card>
      )}

      {step === 4 && (
        <Card className="p-6 space-y-5">
          <h2 className="text-xl font-semibold">Set your rates</h2>
          <p className="text-sm text-text-secondary">Set prices for each content format you create. These are visible to matched brands.</p>
          {data.contentFormats.map((format) => {
            const existing = data.rateCard.find((r) => r.format === format);
            return (
              <div key={format} className="flex items-center justify-between gap-4">
                <span className="text-sm font-medium text-text-primary">{format}</span>
                <div className="w-40">
                  <Input
                    type="number"
                    placeholder="₹ Price"
                    value={existing?.price ?? ""}
                    onChange={(e) => {
                      const price = Number(e.target.value);
                      const updated = data.rateCard.filter((r) => r.format !== format);
                      if (price > 0) updated.push({ format, price });
                      updateData({ rateCard: updated });
                    }}
                  />
                </div>
              </div>
            );
          })}
          {data.contentFormats.length === 0 && (
            <p className="text-sm text-text-secondary italic">Go back and select content formats first.</p>
          )}
        </Card>
      )}

      {step === 5 && (
        <Card className="p-6 space-y-5">
          <h2 className="text-xl font-semibold">Review your profile</h2>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-text-secondary uppercase tracking-wide">Name</p>
              <p className="text-sm font-medium">{data.name || "—"}</p>
            </div>
            <div>
              <p className="text-xs text-text-secondary uppercase tracking-wide">Location</p>
              <p className="text-sm font-medium">{data.location || "—"}</p>
            </div>
            <div>
              <p className="text-xs text-text-secondary uppercase tracking-wide">Bio</p>
              <p className="text-sm">{data.bio || "—"}</p>
            </div>
            <div>
              <p className="text-xs text-text-secondary uppercase tracking-wide mb-1">Verticals</p>
              <div className="flex flex-wrap gap-1">
                {data.contentVerticals.map((v) => <Badge key={v} variant="accent">{v}</Badge>)}
              </div>
            </div>
            <div>
              <p className="text-xs text-text-secondary uppercase tracking-wide mb-1">Formats</p>
              <div className="flex flex-wrap gap-1">
                {data.contentFormats.map((f) => <Badge key={f} variant="outline">{f}</Badge>)}
              </div>
            </div>
            <div>
              <p className="text-xs text-text-secondary uppercase tracking-wide">Min Budget</p>
              <p className="text-sm font-mono font-medium text-accent">{formatCurrency(data.minBudget)}</p>
            </div>
            {data.rateCard.length > 0 && (
              <div>
                <p className="text-xs text-text-secondary uppercase tracking-wide mb-1">Rate Card</p>
                {data.rateCard.map((r) => (
                  <div key={r.format} className="flex justify-between text-sm">
                    <span>{r.format}</span>
                    <span className="font-mono">{formatCurrency(r.price)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>
      )}
    </WizardShell>
  );
}
