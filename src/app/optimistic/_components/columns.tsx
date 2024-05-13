"use client"

import { Button } from "@/components/ui/button"
// import { statuses } from "@/types/data-enum-status"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, CheckCheck, GitPullRequestClosed, Loader } from "lucide-react"
import CellAction from "./cellAction"
import { DataTableColumnHeader } from "./data-table-column-header"
import { CircleIcon, QuestionMarkCircledIcon } from "@radix-ui/react-icons"
import { Requests } from "@prisma/client"
import Link from "next/link"

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

export const roles = [

]




export const columns: ColumnDef<Requests>[] = [
  {
    accessorKey: "RequestCode",
    header: ({ column }) => {


      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "desc" ? false : true)}
        >
          Request Code
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },

    cell: ({ row }) =>{

      return (
        <div className="uppercase text-red-500 hover:underline ">
            <Link href={`/new-request/${row.original.Id}`}>{row.getValue("RequestCode")}</Link>
        </div>
      )
    
    }
  },
  {
    accessorKey: "CreatedDate",
    header: ({ column }) => {

      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "desc" ? false : true)}
        >
          Creation Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },

    cell: ({ row }) =>{
      const date = new Date(row.getValue("CreatedDate"));

      return <div className="uppercase">{date.toLocaleString()}</div>
    }

  },
  {
    accessorKey: "RequestDisplayName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "desc" ? false : true)}
        >
          Request By
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },

    cell: ({ row }) => <div className="uppercase">{row.getValue("RequestDisplayName")}</div>,

  },
  {
    accessorKey: "RequestDescription",
    header: "Description",
  },
  {
    accessorKey: "RequestStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("RequestStatus")
      )

      if (!status) {
        return null
      }

      return (
        <div className={`flex w-[100px]  justify-between items-center font-semibold rounded-lg ${status.style}`}>
          <span >{status.label}</span>

          {status.icon && (
            <status.icon className={`ml-2 h-8 w-8 ${status.style}`} />
          )}
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "Actions",
    id: "actions",
    cell: () => <CellAction />
  }
]
