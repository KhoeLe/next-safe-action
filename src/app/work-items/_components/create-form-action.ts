"use server";

import {
  createWorkItem,
  deleteWorkItem,
  getWorkItemById,
  inactiveWorkItem,
  updateWorkItem,
} from "@/data-access/workItems";
import { action } from "@/lib/safe-action";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const formDataSchema = z.object({
  title: z.string().min(8),
  status: z.enum(["to do", "in process", "done"]),
  assignee: z.string().min(1),
  priority: z.enum(["low", "normal", "high"]),
  type: z.enum(["bug", "feature", "task"]),
  description: z.string().min(8),
  // file: z.instanceof(File)
  file: z.string().optional(),
});

const updateFormSchema = formDataSchema.extend({
  id: z.string(), // Add this line
});

const deleteFormSchema = z.object({
  id: z.string()
})

export const createForm = action(
  formDataSchema,
  async ({ title, status, assignee, priority, type, description , file }) => {
    try {
      const createData = {
        title,
        status,
        assignee,
        priority,
        type,
        description,
        updatedAt: null,
        workItemsStatus: "active" as const,
        workItemsStatusAtTime: null, // Add this line
        // file: file,
        file: file ? file : null,
      };

      console.log(createData)


      // const newWorkItem = await createWorkItem(createData);

      revalidatePath("/work-items");

      // return newWorkItem;
    } catch (error) {
      console.error(error);
      throw new Error("An error occurred while creation the work item");
    }
  }
);

export const updateForm = action(
  updateFormSchema,
  async ({ title, status, assignee, priority, type, description, id }) => {
    try {
      const getItemById = await getWorkItemById(id);

      if (!getItemById) {
        throw new Error("Work item not found");
      }

      const updateData = {
        title,
        status,
        assignee,
        priority,
        type,
        description,
        updatedAt: new Date(),
      };

      const updatedWorkItem = await updateWorkItem(getItemById.id, updateData);

      revalidatePath("/work-items");

      return updatedWorkItem;
    } catch (error) {
      console.error(error);
      throw new Error("An error occurred while updating the work item");
    }
  }
);

export const deleteForm = action(deleteFormSchema, async ({id}) => {

  try {
    
    const getItemById = await getWorkItemById(id);

    if (!getItemById) {
      throw new Error("Work item not found");
    }

    const updateDate = {
      workItemsStatusAtTime : new Date(),
    }

    // const deletedWorkItem = await deleteWorkItem(getItemById.id);
    const isInactiveWorkItem = await inactiveWorkItem(getItemById.id, updateDate.workItemsStatusAtTime);

    revalidatePath("/work-items");

    return isInactiveWorkItem;
  } catch (error) {
    console.error(error);
      throw new Error("An error occurred while deleting the work item");
  }

} )