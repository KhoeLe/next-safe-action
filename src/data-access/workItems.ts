import { database } from "@/db";
import {WorkItem, workItems } from "@/db/schema";
import { eq } from "drizzle-orm";

/**
 * Here is an example CRUD methods for the workItems table.
 * If you plan to keep your code base "clean", we recommend
 * no where else know about dizzle other than your data-access directory.
 */

// WorkItem is a type
// workItems is a table
export async function createWorkItem(newWorkItem: Omit<WorkItem, "id" | "createdAt">) {
  const [workItem] = await database.insert(workItems).values(newWorkItem).returning();
  return workItem;
}

export async function updateWorkItem(workItemID: string, updatedFields: Partial<WorkItem>) {
  const [workItem] = await database.update(workItems).set(updatedFields).where(eq(workItems.id, workItemID)).returning();
  return workItem;
}

export async function deleteWorkItem(workItemID: string) {
  const [workItem] = await database.delete(workItems).where(eq(workItems.id, workItemID)).returning();
  return workItem;
}

export async function inactiveWorkItem(workItemID: string, workItemsStatusAtTime: Date) {
  const [workItem] = await database.update(workItems).set({workItemsStatus: 'inactive', workItemsStatusAtTime :workItemsStatusAtTime }).where(eq(workItems.id, workItemID)).returning();
  return workItem;
}

export async function getWorkItems() {
  const workItems = await database.query.workItems.findMany({
    where : (workItem) => eq(workItem.workItemsStatus, 'active'),
    orderBy: (workItem, { desc }) => [desc(workItem.createdAt)],
  });
  return workItems;
}

export async function getWorkItemById(workItemID: string) {
  const workItem = await database.query.workItems.findFirst({ where: eq(workItems.id, workItemID) });
  return workItem;
}
