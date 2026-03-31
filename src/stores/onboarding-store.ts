import { create } from "zustand";

interface CreatorOnboardingState {
  step: number;
  data: {
    name: string;
    bio: string;
    location: string;
    avatar: string;
    socialLinks: { instagram: string; youtube: string; tiktok: string; twitter: string };
    contentVerticals: string[];
    contentFormats: string[];
    minBudget: number;
    availability: string;
    excludedCategories: string[];
    rateCard: { format: string; price: number }[];
  };
  setStep: (step: number) => void;
  updateData: (data: Partial<CreatorOnboardingState["data"]>) => void;
  reset: () => void;
}

const defaultCreatorData: CreatorOnboardingState["data"] = {
  name: "",
  bio: "",
  location: "",
  avatar: "",
  socialLinks: { instagram: "", youtube: "", tiktok: "", twitter: "" },
  contentVerticals: [],
  contentFormats: [],
  minBudget: 5000,
  availability: "OPEN",
  excludedCategories: [],
  rateCard: [],
};

export const useCreatorOnboarding = create<CreatorOnboardingState>((set) => ({
  step: 0,
  data: { ...defaultCreatorData },
  setStep: (step) => set({ step }),
  updateData: (data) => set((state) => ({ data: { ...state.data, ...data } })),
  reset: () => set({ step: 0, data: { ...defaultCreatorData } }),
}));

interface BusinessOnboardingState {
  step: number;
  data: {
    companyName: string;
    website: string;
    industry: string;
    companySize: string;
    logo: string;
    campaignGoals: string[];
    budgetRange: number;
    targetAgeRange: { min: number; max: number };
    targetGender: string;
    targetRegions: string[];
    targetVerticals: string[];
  };
  setStep: (step: number) => void;
  updateData: (data: Partial<BusinessOnboardingState["data"]>) => void;
  reset: () => void;
}

const defaultBusinessData: BusinessOnboardingState["data"] = {
  companyName: "",
  website: "",
  industry: "",
  companySize: "STARTUP",
  logo: "",
  campaignGoals: [],
  budgetRange: 50000,
  targetAgeRange: { min: 18, max: 45 },
  targetGender: "",
  targetRegions: [],
  targetVerticals: [],
};

export const useBusinessOnboarding = create<BusinessOnboardingState>((set) => ({
  step: 0,
  data: { ...defaultBusinessData },
  setStep: (step) => set({ step }),
  updateData: (data) => set((state) => ({ data: { ...state.data, ...data } })),
  reset: () => set({ step: 0, data: { ...defaultBusinessData } }),
}));
