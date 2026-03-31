import { z } from "zod";

export const figmaFileQuerySchema = z.object({
  fileKey: z.string().min(1, "fileKey is required"),
});

export const figmaImagesQuerySchema = z.object({
  fileKey: z.string().min(1, "fileKey is required"),
  nodeIds: z.string().min(1, "nodeIds is required"),
  format: z.enum(["jpg", "png", "svg", "pdf"]).default("png"),
  scale: z.coerce.number().min(0.01).max(4).default(2),
});

export type FigmaFileQuery = z.infer<typeof figmaFileQuerySchema>;
export type FigmaImagesQuery = z.infer<typeof figmaImagesQuerySchema>;
