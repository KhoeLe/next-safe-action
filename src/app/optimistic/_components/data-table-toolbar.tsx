"use client"
import { X } from "lucide-react"
import { Table } from "@tanstack/react-table"

import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import { Input } from "@/components/ui/input"
import { statuses } from "./columns"
import { Button } from "@/components/ui/button"

interface DataTableToolbarProps<TData> {
    table: Table<TData>
    searchKey: string
}

export function DataTableToolbar<TData>({
    table,
    searchKey,
}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0

    return (
        <div className="flex items-center justify-between">
            <div className="flex md:flex-row flex-col items-center space-x-2 py-4 md:space-y-0 space-y-4  text-xs md:text-sm">
                <Input
                    placeholder={`Search ${searchKey}`}
                    value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn(searchKey)?.setFilterValue(event.target.value)
                    }
                    className="h-8 w-[150px] lg:w-[250px]"
                />
                
                {table.getColumn("RequestStatus") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("RequestStatus")}
                        title="Request Status"
                        options={statuses}
                    />
                )}
                
                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => table.resetColumnFilters()}
                        className="h-8 px-2 lg:px-3"
                    >
                        Reset
                        <X className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>
        </div>
    )
}