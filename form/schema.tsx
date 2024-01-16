import * as z from "zod";

export const eventSchema = z.object({
  eventTitle: z.string().min(2).max(100),
  place: z.string().max(50),
  description: z.string().max(500),
  eventDate: z.date({
    required_error: "Please select a date and time",
    invalid_type_error: "That's not a date!",
  }),
  tags: z.array(
    z.object({
      name: z.string().max(30),
      color: z.string(),
    })
  ),
});

export const quoteSchema = z.object({
  author: z.string().min(2).max(100),
  content: z.string().min(2).max(1000),
  draftStatus: z.string(),
  // tags: z.tuple([z.string()]),
  tags: z.array(
    z.object({
      name: z.string().max(30),
      color: z.string(),
    })
  ),
});

export const contactEmailSchema = z.object({
  sender_name: z.string({
    required_error: "Please enter your name",
  }).min(2, {
    message: "Name must be at least 2 characters long",
  }).max(20, {
    message: "Name must be less than 20 characters long",
  }),
  sender_email: z.string({
    required_error: "Please enter your email",
  }).email({
    message: "Please enter a valid email address",
  }),
  title: z.string({
    required_error: "Please enter a title",
  }).min(2, {
    message: "Title must be at least 2 characters long",
  }).max(50, {
    message: "Title must be less than 50 characters long",
  }),
  message: z.string({
    required_error: "Please enter a message",
  }).min(2, {
    message: "Message must be at least 2 characters long",
  }).max(1000, {
    message: "Message must be less than 1000 characters long",
  }),
});

export const commentSchema = z.object({
  comment: z
    .string({
      required_error: "Please enter a comment",
    })
    .min(2, {
      message: "Comment must be at least 2 characters long",
    })
    .max(1000, {
      message: "Comment must be less than 1000 characters long",
    }),
});

export const proposalSchema = z.object({
  title: z
    .string({
      required_error: "Please enter a title",
    })
    .min(2, {
      message: "Title must be at least 2 characters long",
    })
    .max(50, {
      message: "Title must be less than 50 characters long",
    }),
  description: z.string().max(5000, {
    message: "Description must be less than 5000 characters long",
  }),
  labels: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

