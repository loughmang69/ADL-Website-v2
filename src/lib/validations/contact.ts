import { z } from "zod";
import { HELP_OPTIONS } from "@/data/content";

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  phone: z
    .string()
    .max(30)
    .regex(/^[0-9+().\-\s]*$/, "Enter a valid phone number")
    .optional()
    .or(z.literal("")),
  businessType: z.string().max(200).optional().or(z.literal("")),
  // Required: real clients always pick a service; most sales pitches skip it.
  helpWith: z
    .string({ required_error: "Please choose what we can help with" })
    .refine((v) => HELP_OPTIONS.includes(v), {
      message: "Please choose what we can help with",
    }),
  contactMethod: z.enum(["Email", "Phone"]),
  notes: z.string().max(2000).optional().or(z.literal("")),
  // Honeypot: must be empty.
  "bot-field": z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
