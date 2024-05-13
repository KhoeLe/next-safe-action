'use client'
import { WorkItem } from '@/db/schema'
import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import CreateForm from './create-form'
import DataTable from './data-table'
import { columns } from './columns'
import usePreviewModalWorkItemStore from '@/store/workItem-store'

const statusVariantMap = {
  "to do": 'text-red-600 hover:text-red-600',
  "in process": 'text-yellow-600 font-base',
  "done": 'text-green-600 font-base',
};

const typeVariantMap = {
  "bug": 'text-red-600 hover:text-red-600',
  "feature": 'text-cyan-600 font-base',
  "task": 'text-fuchsia-600 font-base',
}

const priorityVariantMap = {
  "high": 'text-red-600 focus:text-red-600 font-base',
  "normal": 'text-yellow-600 font-base',
  "low": 'text-green-600 font-base',

}



function WorkItems({ workItems }: { workItems: WorkItem[] }) {

  const {isOpen, setOpenSheet,setSelectedWorkItem, selectedWorkItem} = usePreviewModalWorkItemStore((state) => state)

  React.useEffect(() => {
    if (!isOpen) {
      setSelectedWorkItem({} as WorkItem);
    }
  }, [isOpen,setSelectedWorkItem]);



  return (
    <div >
      {/* Create button to add new item with sheet form */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl">Your Work Items</h1>
        <CreateForm initialValues={selectedWorkItem} workItems={workItems} setOpenSheet={setOpenSheet} openSheet={isOpen} />
      </div>

      <hr className="border-b my-4" />


      {/* List item to be added here with table List */}
      {/* <Card className='container'>
        <CardHeader className="px-7">
          <CardTitle>Work Item</CardTitle>
          <CardDescription>Recent work items form tickets.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead className="hidden sm:table-cell">Priority</TableHead>
                <TableHead className="hidden sm:table-cell">Type</TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead className="text-right">Assignee</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className='test-base' >
              {workItems.map((workItem) => {
                return (
                  <TableRow key={workItem.id}>
                    <TableCell>
                      <button onClick={() => handleWorkItemClick(workItem)} className='text-left text-primary hover:text-primary-lighter hover:underline'>
                        <p className="  font-normal  text-ellipsis  line-clamp-2">
                          {workItem.title}
                        </p>
                      </button>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell capitalize">
                      <Badge className={cn(priorityVariantMap[workItem.priority as keyof typeof priorityVariantMap], 'capitalize')} variant={'outline'}>
                        {workItem.priority}
                      </Badge>

                    </TableCell>
                    <TableCell className="hidden sm:table-cell capitalize">
                      <Badge className={cn(typeVariantMap[workItem.type as keyof typeof typeVariantMap], 'capitalize')} variant={'outline'}>
                        {workItem.type}
                      </Badge>

                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge className={cn(statusVariantMap[workItem.status as keyof typeof statusVariantMap], 'capitalize text-nowrap')} variant={'outline'}>
                        {workItem.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{formatDate(workItem?.createdAt.toString())}</TableCell>
                    <TableCell className="text-right">Louis Le</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card> */}


      <div className="mt-4">
            <DataTable columns={columns} data={workItems} searchKey={'title'} />
      </div>
    </div>
  )
}

export default WorkItems