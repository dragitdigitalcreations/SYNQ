import type { MatchResult } from "@/types";

interface CreatorData {
  contentVerticals: string[];
  contentFormats: string[];
  minBudget: number | null;
  followers: number | null;
  engagementRate: number | null;
  responseTime: number | null;
  onTimeRate: number | null;
  repeatRate: number | null;
  location: string | null;
}

interface CampaignCriteria {
  targetVerticals: string[];
  budget: number;
  targetRegions: string[];
  targetAgeRange?: { min: number; max: number } | null;
  targetGender?: string | null;
  deliverableFormats?: string[];
}

export function calculateMatchScore(
  creator: CreatorData,
  campaign: CampaignCriteria
): MatchResult {
  const reasons: string[] = [];

  // 1. Content Alignment (30%)
  const verticalOverlap = creator.contentVerticals.filter((v) =>
    campaign.targetVerticals.includes(v)
  );
  const contentScore = campaign.targetVerticals.length > 0
    ? (verticalOverlap.length / campaign.targetVerticals.length) * 100
    : 50;
  if (verticalOverlap.length > 0) {
    reasons.push(`Content verticals match: ${verticalOverlap.join(", ")}`);
  }

  // 2. Audience Overlap (35%) — simplified without real analytics
  let audienceScore = 50; // baseline
  if (creator.followers && creator.followers > 1000) {
    audienceScore += 15;
    reasons.push("Creator has established audience reach");
  }
  if (creator.engagementRate && creator.engagementRate > 3) {
    audienceScore += 20;
    reasons.push(`High engagement rate (${creator.engagementRate}%)`);
  }
  if (creator.location && campaign.targetRegions.length > 0) {
    const locationMatch = campaign.targetRegions.some(
      (r) => creator.location?.toLowerCase().includes(r.toLowerCase())
    );
    if (locationMatch) {
      audienceScore += 15;
      reasons.push("Regional audience alignment");
    }
  }
  audienceScore = Math.min(audienceScore, 100);

  // 3. Budget Fit (20%)
  let budgetScore = 50;
  if (creator.minBudget != null && campaign.budget > 0) {
    if (campaign.budget >= creator.minBudget) {
      budgetScore = 100;
      reasons.push("Budget is within creator's rate range");
    } else if (campaign.budget >= creator.minBudget * 0.7) {
      budgetScore = 70;
      reasons.push("Budget is slightly below creator's preferred range");
    } else {
      budgetScore = 30;
      reasons.push("Budget may be below creator's minimum");
    }
  }

  // 4. Behavioral Score (15%)
  let behaviorScore = 50;
  if (creator.responseTime != null && creator.responseTime <= 4) {
    behaviorScore += 15;
    reasons.push("Fast responder");
  }
  if (creator.onTimeRate != null && creator.onTimeRate >= 90) {
    behaviorScore += 20;
    reasons.push("Excellent on-time delivery record");
  }
  if (creator.repeatRate != null && creator.repeatRate > 0) {
    behaviorScore += 15;
    reasons.push("Has repeat collaborations");
  }
  behaviorScore = Math.min(behaviorScore, 100);

  // Weighted total
  const score = Math.round(
    audienceScore * 0.35 +
    contentScore * 0.30 +
    budgetScore * 0.20 +
    behaviorScore * 0.15
  );

  return {
    score: Math.min(score, 100),
    reason: reasons.slice(0, 3).join(". ") + ".",
    breakdown: {
      audienceOverlap: Math.round(audienceScore),
      contentAlignment: Math.round(contentScore),
      budgetFit: Math.round(budgetScore),
      behavioralScore: Math.round(behaviorScore),
    },
  };
}
