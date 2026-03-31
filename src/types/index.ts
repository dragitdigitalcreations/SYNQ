export type UserRole = "CREATOR" | "BUSINESS";
export type Availability = "OPEN" | "SELECTIVE" | "UNAVAILABLE";
export type CompanySize = "SOLO" | "STARTUP" | "SMB" | "ENTERPRISE";
export type CampaignStatus = "DRAFT" | "ACTIVE" | "PAUSED" | "COMPLETED";
export type CollabStatus = "INVITED" | "ACCEPTED" | "BRIEFING" | "IN_PROGRESS" | "REVIEW" | "COMPLETED" | "DECLINED";
export type MessageType = "TEXT" | "FILE" | "SCOPE_CARD" | "PAYMENT_NOTIFICATION" | "SYSTEM";
export type PaymentStatus = "ESCROW" | "PARTIAL_RELEASE" | "RELEASED" | "DISPUTED";

export const CONTENT_VERTICALS = [
  "Food", "Travel", "Fashion", "Tech", "Fitness",
  "Lifestyle", "Comedy", "Education", "Beauty", "Gaming",
  "Music", "Photography", "Business", "Health", "Sports",
] as const;

export const CONTENT_FORMATS = [
  "Reels", "YouTube Videos", "Stories", "Blog Posts",
  "Photography", "Podcasts", "Tweets/Threads", "LinkedIn Posts",
] as const;

export const PLATFORMS = [
  "Instagram", "YouTube", "TikTok", "Twitter/X", "LinkedIn", "Blog",
] as const;

export const EXCLUDED_CATEGORIES = [
  "Alcohol", "Tobacco", "Gambling", "Political", "Adult Content",
  "Cryptocurrency", "MLM/Network Marketing",
] as const;

export const OBJECTIVES = [
  "Brand Awareness",
  "Product Launch",
  "Event Promotion",
  "Content Production",
  "User-Generated Content",
  "App Install",
  "Lead Generation",
] as const;

export const INDUSTRIES = [
  "E-commerce / D2C",
  "Fashion & Apparel",
  "Food & Beverage",
  "Technology",
  "Health & Wellness",
  "Education",
  "Finance",
  "Entertainment",
  "Travel & Hospitality",
  "Beauty & Personal Care",
  "Agency",
  "Other",
] as const;

export interface MatchResult {
  score: number;
  reason: string;
  breakdown: {
    audienceOverlap: number;
    contentAlignment: number;
    budgetFit: number;
    behavioralScore: number;
  };
}

export interface RateCardItem {
  format: string;
  price: number;
}

export interface ScopeCard {
  deliverables: {
    contentType: string;
    quantity: number;
    platform: string;
    description: string;
    revisionLimit: number;
    price: number;
  }[];
  totalBudget: number;
  usageRights: boolean;
  timeline: { start: string; end: string };
  terms: string;
}
