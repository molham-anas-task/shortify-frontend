import { z } from "zod";

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(6, { message: "Username must be at least 6 characters." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
    confirmPassword: z.string(),
    agreeToTerms: z.boolean().refine((value) => value, {
      message: "You must agree to the terms.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
