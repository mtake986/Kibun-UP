import * as z from "zod";

export const eventSchema = z.object({
  eventTitle: z.string().min(2).max(100),
  place: z.string().max(50),
  description: z.string().min(2).max(500),
  eventDate: z.date({
    required_error: "Please select a date and time",
    invalid_type_error: "That's not a date!",
  }),
  target: z.boolean(),
});


export const quoteSchema = z.object({
  person: z.string().min(2).max(100),
  quote: z.string().min(2).max(1000),
  isDraft: z.boolean(),
});
