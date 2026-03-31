import { z } from "zod";

export const deliverableSchema = z.object({
  contentType: z.string().min(1),
  quantity: z.number().min(1).default(1),
  platform: z.string().min(1),
  description: z.string().optional(),
  revisionLimit: z.number().min(1).max(5).default(2),
  usageRights: z.boolean().default(false),
  price: z.number().min(0).optional(),
});

export const campaignSchema = z.object({
  name: z.string().min(3, "Campaign name must be at least 3 characters"),
  description: z.string().min(10, "Please provide a description"),
  objective: z.string().min(1, "Select an objective"),
  budget: z.number().min(500, "Minimum budget is ₹500"),
  startDate: z.string().min(1, "Select a start date"),
  endDate: z.string().min(1, "Select an end date"),
  targetVerticals: z.array(z.string()).min(1, "Select at least one vertical"),
  targetRegions: z.array(z.string()).default([]),
  targetAgeRange: z.object({
    min: z.number().min(13).default(18),
    max: z.number().max(65).default(45),
  }).optional(),
  targetGender: z.string().optional(),
  usageRights: z.boolean().default(false),
  deliverables: z.array(deliverableSchema).min(1, "Add at least one deliverable"),
});

export type CampaignInput = z.infer<typeof campaignSchema>;
export type DeliverableInput = z.infer<typeof deliverableSchema>;
