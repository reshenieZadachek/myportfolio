import { z } from "zod";

// Contact form validation schema
export const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" })
});

// Project request form validation schema
export const projectRequestSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  description: z.string().min(20, { message: "Project description must be at least 20 characters" }),
  budget: z.string().optional(),
  timeline: z.string().optional()
});
