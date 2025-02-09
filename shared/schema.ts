import { pgTable, text, serial, integer, boolean, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  completed: boolean("completed").notNull().default(false),
  priority: integer("priority").notNull(), // 1: Low, 2: Medium, 3: High
  dueDate: date("due_date"),
});

export const insertTaskSchema = createInsertSchema(tasks)
  .omit({ id: true, completed: true })
  .extend({
    title: z.string().min(1, "Title is required").max(100),
    priority: z.number().min(1).max(3),
    dueDate: z.date().nullable(),
  });

export type InsertTask = z.infer<typeof insertTaskSchema>;
export type Task = typeof tasks.$inferSelect;