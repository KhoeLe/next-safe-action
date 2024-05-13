import { getWorkItems, updateWorkItem } from "@/data-access/workItems";
import { WorkItem } from "@/db/schema";

export async function getWorkItemUseCase() {

  const workItems = await getWorkItems()
  return workItems;
}

export async function updateWorkItemUseCase(workItemID: string, updatedFields: Partial<WorkItem>) {
  const updatedWorkItem = await updateWorkItem(workItemID, updatedFields)
  return updatedWorkItem;
}