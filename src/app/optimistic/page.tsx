import { getLikes } from "@/app/optimistic/addLikes-action";
import { Button } from "@/components/ui/button";
import AddLikeForm from "@/app/optimistic/_components/update-form";
import { HomeIcon } from "lucide-react";
import Link from "next/link";

export const metadata = {
	title: "Action using optimistic hook",
};

export default function OptimisticHook() {
	const likesCount = getLikes();
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">


			<div>
				<h1>Action using optimistic hook</h1>
				<pre style={{ marginTop: "1rem" }}>
					Server state: {JSON.stringify(likesCount)}
				</pre>
				{/* Pass the server state to Client Component */}
				<AddLikeForm likesCount={likesCount} />
			</div>



			<Button className='flex items-center' variant={"link"}>
				<HomeIcon className="w-6 h-6 mr-2" />
				<Link href="/">Go to home</Link>
			</Button>
		</main>

	);
}