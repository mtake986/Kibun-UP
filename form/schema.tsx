import * as z from "zod";

export const eventSchema = z.object({
  eventTitle: z.string().min(2).max(50),
  place: z.string().max(50),
  description: z.string().min(2).max(250),
  eventDate: z.date({
    required_error: "Please select a date and time",
    invalid_type_error: "That's not a date!",
  }),
});
