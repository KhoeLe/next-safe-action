
import { Button } from '@/components/ui/button'
import { HomeIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import CreateForm from './_components/create-form'
import { getWorkItemUseCase } from '@/use-cases/work-item'
import WorkItems from './_components/work-items'

export default async function WorkItemPage() {


	const workItems = await getWorkItemUseCase()

	const hasWorkItems = workItems.length > 0

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">

			<div>
				{hasWorkItems && (
					<div className="flex flex-col gap-4">

						<WorkItems workItems={workItems} />
					</div>
				)}
			</div>


			<Button className='flex items-center' variant={"link"}>
				<HomeIcon className="w-6 h-6 mr-2" />
				<Link href="/">Go to home</Link>
			</Button>
		</main>

	)
}

