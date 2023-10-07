import * as z from "zod";

export const eventSchema = z.object({
  eventTitle: z.string().min(2).max(100),
  place: z.string().max(50),
  description: z.string().max(500),
  eventDate: z.date({
    required_error: "Please select a date and time",
    invalid_type_error: "That's not a date!",
  }),
});

export const quoteSchema = z.object({
  person: z.string().min(2).max(100),
  quote: z.string().min(2).max(1000),
  isDraft: z.boolean(),
  // tags: z.tuple([z.string()]),
  tags: z.array(
    z.object({
      tag: z.string().max(30),
      tagColor: z.string(),
    })
  ),
});

export const contactEmailSchema = z.object({
  sender_name: z.string().min(2).max(20),
  sender_email: z.string().email(),
  title: z.string().min(2).max(30),
  message: z.string().min(2).max(1000),
});
