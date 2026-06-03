import { z } from "zod";

export const testimonialSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  role: z.string().max(200).optional().or(z.literal("")),
  stars: z.coerce.number().int().min(1, "Select a rating").max(5),
  text: z
    .string()
    .min(20, "Please write at least 20 characters")
    .max(2000),
  // Honeypot: must be empty.
  "bot-field": z.string().max(0).optional().or(z.literal("")),
});

export type TestimonialInput = z.infer<typeof testimonialSchema>;
