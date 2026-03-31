import { create } from "zustand";
import type { DeliverableInput } from "@/lib/validations/campaign";

interface CampaignBuilderState {
  step: number;
  data: {
    name: string;
    description: string;
    objective: string;
    budget: number;
    startDate: string;
    endDate: string;
    targetVerticals: string[];
    targetRegions: string[];
    targetAgeRange: { min: number; max: number };
    targetGender: string;
    usageRights: boolean;
    deliverables: DeliverableInput[];
  };
  setStep: (step: number) => void;
  updateData: (data: Partial<CampaignBuilderState["data"]>) => void;
  addDeliverable: (d: DeliverableInput) => void;
  removeDeliverable: (index: number) => void;
  reset: () => void;
}

const defaultData: CampaignBuilderState["data"] = {
  name: "",
  description: "",
  objective: "",
  budget: 50000,
  startDate: "",
  endDate: "",
  targetVerticals: [],
  targetRegions: [],
  targetAgeRange: { min: 18, max: 45 },
  targetGender: "",
  usageRights: false,
  deliverables: [],
};

export const useCampaignBuilder = create<CampaignBuilderState>((set) => ({
  step: 0,
  data: { ...defaultData },
  setStep: (step) => set({ step }),
  updateData: (data) => set((state) => ({ data: { ...state.data, ...data } })),
  addDeliverable: (d) =>
    set((state) => ({ data: { ...state.data, deliverables: [...state.data.deliverables, d] } })),
  removeDeliverable: (index) =>
    set((state) => ({
      data: { ...state.data, deliverables: state.data.deliverables.filter((_, i) => i !== index) },
    })),
  reset: () => set({ step: 0, data: { ...defaultData } }),
}));
