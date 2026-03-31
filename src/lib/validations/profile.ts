import { z } from "zod";

export const creatorProfileSchema = z.object({
  name: z.string().min(2),
  bio: z.string().max(280).optional(),
  location: z.string().optional(),
  avatar: z.string().optional(),
  contentVerticals: z.array(z.string()).min(1, "Select at least one vertical"),
  contentFormats: z.array(z.string()).min(1, "Select at least one format"),
  minBudget: z.number().min(500).optional(),
  availability: z.enum(["OPEN", "SELECTIVE", "UNAVAILABLE"]).default("OPEN"),
  excludedCategories: z.array(z.string()).default([]),
  socialLinks: z.object({
    instagram: z.string().optional(),
    youtube: z.string().optional(),
    tiktok: z.string().optional(),
    twitter: z.string().optional(),
  }).optional(),
  rateCard: z.array(z.object({
    format: z.string(),
    price: z.number().min(0),
  })).optional(),
});

export const businessProfileSchema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  website: z.string().url().optional().or(z.literal("")),
  industry: z.string().min(1, "Select an industry"),
  companySize: z.enum(["SOLO", "STARTUP", "SMB", "ENTERPRISE"]),
  logo: z.string().optional(),
  targetDemo: z.object({
    ageRange: z.array(z.string()).optional(),
    gender: z.string().optional(),
    regions: z.array(z.string()).optional(),
  }).optional(),
});

export type CreatorProfileInput = z.infer<typeof creatorProfileSchema>;
export type BusinessProfileInput = z.infer<typeof businessProfileSchema>;
