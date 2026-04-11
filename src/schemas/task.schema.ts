import { z } from "zod";

export const createTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(100, "Title cannot exceed 100 characters"),
  description: z
    .string()
    .max(500, "Description cannot exceed 500 characters")
    .optional(),
  status: z.enum(["pending", "in-progress", "done"]).optional(),
});

export const updateTaskSchema = z.object({
  title: z.string().min(1, "Title cannot be empty").max(100).optional(),

  description: z.string().max(500).optional(),

  status: z.enum(["pending", "in-progress", "done"]).optional(),
});
