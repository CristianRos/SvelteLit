import { pgTable, serial, text, boolean, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import z from 'zod';

export const tasks = pgTable('tasks', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    description: text('description').notNull(),
    completed: boolean('completed').notNull().default(false),
    createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow()
});

export const getTaskSchema = createSelectSchema(tasks);

export const createTaskSchema = createInsertSchema(tasks, {
    title: (s) => s.title.min(1).max(100),
    description: (s) => s.description.min(1).max(350)
})
    .required({
        completed: true
    })
    .omit({
        id: true,
        createdAt: true,
        updatedAt: true
    });

export const updateTaskSchema = createTaskSchema.partial();

export type GetTask = z.infer<typeof getTaskSchema>;
export type CreateTask = z.infer<typeof createTaskSchema>;
export type UpdateTask = z.infer<typeof updateTaskSchema>;
