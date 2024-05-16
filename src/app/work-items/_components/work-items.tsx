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
import { usePreviewModalWorkItemStore } from '@/store/workItem-store'

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
        <CreateForm initialValues={selectedWorkItem}  setOpenSheet={setOpenSheet} openSheet={isOpen} />
      </div>

      <hr className="border-b my-4" />


     


      <div className="mt-4">
            <DataTable columns={columns} data={workItems} searchKey={'title'} />
      </div>
    </div>
  )
}

export default WorkItems