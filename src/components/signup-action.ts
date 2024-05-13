"use server";

import { action } from "@/lib/safe-action";
import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const signup = action(schema, async ({ email, password }) => {

  await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Email:", email, "Password:", password);
 

  redirect("/work-items");

  // Do something useful here.


});