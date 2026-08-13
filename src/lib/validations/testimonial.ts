import { z } from "zod";

export const testimonialSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  role: z.string().max(200).optional().or(z.literal("")),
  stars: z.coerce.number().int().min(1, "Select a rating").max(5),
  text: z
    .string()
    .min(20, "Please write at least 20 characters")
    .max(2000),
  /**
   * Display consent. Must be literally `true`, so the server rejects a
   * submission that omits it rather than trusting the client-side gate. This
   * checkbox exists to be evidence of permission, and evidence that can be
   * skipped by posting straight to the API is not evidence.
   */
  permission: z.literal(true, {
    errorMap: () => ({
      message: "Please grant permission to display your testimonial",
    }),
  }),
  // Honeypot: must be empty.
  "bot-field": z.string().max(0).optional().or(z.literal("")),
});

export type TestimonialInput = z.infer<typeof testimonialSchema>;
