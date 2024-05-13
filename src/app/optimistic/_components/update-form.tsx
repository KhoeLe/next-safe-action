"use client";

import { useOptimisticAction } from "next-safe-action/hooks";
import { addLikes } from "../addLikes-action";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";

type Props = {
	likesCount: number;
};

const AddLikeForm = ({ likesCount }: Props) => {
	// Here we pass safe action (`addLikes`) and current server state to `useAction` hook.
	const { execute, result, status, reset, optimisticData } =
		useOptimisticAction(
			addLikes,
			{ likesCount },
			({ likesCount }, { incrementBy }) => ({
				likesCount: likesCount + incrementBy,
			}),
			{
				onSuccess(data, input, reset) {
					console.log("HELLO FROM ONSUCCESS", data, input);

					// You can reset result object by calling `reset`.
					// reset();
				},
				onError(error, input, reset) {
					console.log("OH NO FROM ONERROR", error, input);

					// You can reset result object by calling `reset`.
					// reset();
				},
				onSettled(result, input, reset) {
					console.log("HELLO FROM ONSETTLED", result, input);

					// You can reset result object by calling `reset`.
					// reset();
				},
				onExecute(input) {
					console.log("HELLO FROM ONEXECUTE", input);
				},
			}
		);





	return (
		<>
			<form
				className=""
				onSubmit={async (e) => {
					e.preventDefault();
					const formData = new FormData(e.currentTarget);
					const input = Object.fromEntries(formData) as {
						incrementBy: string;
					};

					const intIncrementBy = parseInt(input.incrementBy);

					// Action call. Here we pass action input and expected (optimistic)
					// data.
					await execute({ incrementBy: intIncrementBy });
				}}>
				<div className="space-y-2">
					<Label htmlFor="incrementBy">Increment by:</Label>
					<Input
						type="text"
						name="incrementBy"
						id="incrementBy"
						placeholder="Increment by"
					/>
				</div>

				<div className=" space-y-4 space-x-4">
					<Button type="submit">Add likes</Button>
					<Button type="button" onClick={reset}>
						Reset
					</Button>
				</div>
			</form>
			<div id="result-container">
				{/* This object will update immediately when you execute the action.
						Real data will come back once action has finished executing. */}
				<pre>Optimistic data: {JSON.stringify(optimisticData)}</pre>{" "}
				<pre>Is executing: {JSON.stringify(status === "executing")}</pre>
				<div>Action result:</div>
				<pre className=" border rounded-md min-w-fit text-blue-400">
					{
						result // if got back a result,
							? JSON.stringify(result, null, 1)
							: "fill in form and click on the add likes Button" // if action never ran
					}
				</pre>
			</div>
		</>
	);
};

export default AddLikeForm;