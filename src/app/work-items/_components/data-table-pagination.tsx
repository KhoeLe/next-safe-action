import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { Table } from "@tanstack/react-table"
import {     ChevronLeft,
    ChevronRight,
    ChevronsRight,
    ChevronsLeft, } from "lucide-react"


interface DataTablePaginationProps<TData> {
    table: Table<TData>
}

export function DataTablePagination<TData>({
    table,
}: DataTablePaginationProps<TData>) {
    return (
        <div className="flex items-center justify-between px-2 py-6 ">
            <div className="hidden md:flex-1 text-xs sm:text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="flex items-center space-x-2 lg:space-x-8 md:space-x-6">
                <div className="hidden md:flex items-center space-x-2">
                    <p className="text-xs sm:text-sm font-medium">Rows per page</p>
                    <Select
                        value={`${table.getState().pagination.pageSize}`}
                        onValueChange={(value) => {
                            table.setPageSize(Number(value))
                        }}
                    >
                        <SelectTrigger className="h-8 w-[70px]">
                            <SelectValue placeholder={table.getState().pagination.pageSize} />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {[10, 20, 30, 40, 50].map((pageSize) => (
                                <SelectItem key={pageSize} value={`${pageSize}`}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="w-[100px] items-center justify-center text-xs sm:text-sm font-medium flex">
                    Page {table.getState().pagination.pageIndex + 1} of{" "}
                    {table.getPageCount()}
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <span className="sr-only text-xs sm:text-sm">Go to first page</span>
                        <ChevronsLeft className="h-2 w-2 md:h-4 md:w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <span className="sr-only text-xs sm:text-sm">Go to previous page</span>
                        <ChevronLeft className="h-2 w-2 md:h-4 md:w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <span className="sr-only text-xs sm:text-sm">Go to next page</span>
                        <ChevronRight className="h-2 w-2 md:h-4 md:w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                    >
                        <span className="sr-only text-xs sm:text-sm">Go to last page</span>
                        <ChevronsRight className="h-2 w-2 md:h-4 md:w-4" />
                    </Button>
                </div>
            </div>
           
        </div>
    )
}