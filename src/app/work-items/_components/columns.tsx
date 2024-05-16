"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, CheckCheck, GitPullRequestClosed, Loader } from "lucide-react"
import CellAction from "./cellAction"
import { DataTableColumnHeader } from "./data-table-column-header"
import { WorkItem } from "@/db/schema"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import React, { HTMLProps } from "react"
import { usePreviewModalWorkItemStore } from "@/store/workItem-store"

export const statuses = [
  {
    value: 1,
    label: "Pending For Approval",
    icon: Loader,
    style: "text-yellow-500",
  },
  {
    value: 2,
    label: "Approved",
    icon: CheckCheck,
    style: "text-green-500",
  },
  {
    value: 3,
    label: "Rejected",
    icon: GitPullRequestClosed,
    style: "text-red-500",
  },
]


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


function IndeterminateCheckbox({
  indeterminate,
  className = '',
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = React.useRef<HTMLInputElement>(null!)

  React.useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate
    }
  }, [ref, indeterminate, rest.checked])

  
  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + ' cursor-pointer'}
      {...rest}
    />
  )
}



export const columns: ColumnDef<WorkItem>[] = [
  {
    accessorKey: "id",
    header: () => <Checkbox />,
    cell: ({ row }) => {


      return (
        <div className="px-1">
        <IndeterminateCheckbox
          {...{
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
      </div>
      )
    }



  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "desc" ? false : true)}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },

    cell: ({ row, table }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { isOpen, setOpenSheet, setSelectedWorkItem } = usePreviewModalWorkItemStore((state) => state)

      const handleWorkItemClick = (workItem: WorkItem) => {
        setOpenSheet(true)
        console.log('workItem', workItem)
        setSelectedWorkItem(workItem);
      }
      return (
        <div className="uppercase text-red-500 hover:underline ">
          <button onClick={() => handleWorkItemClick(row.original)} className='text-left text-primary hover:text-primary-lighter hover:underline'>
            <p className="font-normal  text-ellipsis  line-clamp-2">
              {row.getValue("title")}
            </p>
          </button>
        </div>
      )

    }
  },
  {
    accessorKey: "priority",
    header: ({ column }) => {

      return (
        <Button
          className="hidden sm:table-cell"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "desc" ? false : true)}
        >
          Priority
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },

    cell: ({ row }) => {
      return (
        <div className="hidden sm:table-cell capitalize">
          <Badge className={cn(priorityVariantMap[row.getValue("priority") as keyof typeof priorityVariantMap], 'capitalize')} variant={'outline'}>
            {row.getValue("priority")}
          </Badge>
        </div>

      )
    }

  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          className="hidden sm:table-cell"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "desc" ? false : true)}
        >
          Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },

    cell: ({ row }) => {
      return (
        <div className="hidden sm:table-cell capitalize">
          <Badge className={cn(typeVariantMap[row.getValue("type") as keyof typeof typeVariantMap], 'capitalize')} variant={'outline'}>
            {row.getValue("type")}
          </Badge>
        </div>
      )
    }

  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "desc" ? false : true)}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <div className=" ">
          <Badge className={cn(statusVariantMap[row.getValue("status") as keyof typeof statusVariantMap], 'capitalize text-nowrap')} variant={'outline'}>
            {row.getValue("status")}
          </Badge>
        </div>
      )
    }
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {

      const date = new Date(row.getValue("createdAt"));

      return <div className="uppercase hidden sm:table-cell ">{date.toLocaleString()}</div>
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "Actions",
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  }
]
