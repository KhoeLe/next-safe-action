import {
  timestamp,
  pgTable,
  text,
  serial,
  varchar,
  primaryKey,
  integer,
  date,
  boolean,
  uuid,
  unique,
  time,
  pgEnum,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const status = pgEnum("status", ["to do", "in process", "done"]);
export const priority = pgEnum("priority", ["low", "normal", "high"]);
export const type = pgEnum("type", ["bug", "feature", "task"]);
export const workItemsStatus = pgEnum("workItemsStatus", ["active", "inactive"]);

export const workItems = pgTable("workitems", {
  id: uuid("id")
    .notNull()
    .primaryKey()
    .default(sql`gen_random_uuid()`),

  title: varchar("text").notNull(),
  status: status('status'),
  priority: priority('priority'),
  type: type('type'),
  description: text("description").notNull(),
  assignee : varchar("assignee").notNull(),
  createdAt: timestamp("createdAt")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updatedAt").default(sql`now()`),
  workItemsStatus: workItemsStatus('workItemsStatus').default('active'),
  workItemsStatusAtTime: timestamp("workItemsStatusAt").default(sql`now()`),
});


export type WorkItem = typeof workItems.$inferSelect