"use server";

import { action, authAction } from "@/lib/safe-action";
import { revalidatePath } from "next/cache";
import { z } from "zod";

let likes = 42;

export const getLikes = () => likes;

const incrementLikes = (by: number) => {
	likes += by;
	return likes;
};

const input = z.object({
	incrementBy: z.number(),
});

export const addLikes = authAction(input, async ({ incrementBy }, {userId}) => {

	if(!userId) {
		throw new Error("User not authenticated");
	}
	await new Promise((res) => setTimeout(res, 2000));

	const likesCount = incrementLikes(incrementBy);

	// This Next.js function revalidates the provided path.
	// More info here: https://nextjs.org/docs/app/api-reference/functions/revalidatePath
	revalidatePath("/optimistic");

	return {
		likesCount,
	};
});