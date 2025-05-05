import { z } from "zod";

export const urlSchema = z.object({
  originalUrl: z.string().url(),
});

export type UrlFormData = z.infer<typeof urlSchema>;
