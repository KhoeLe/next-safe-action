"use client"
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Ellipsis } from 'lucide-react';
import { useState } from 'react';
import CreateForm from './create-form';
import { WorkItem } from '@/db/schema';
import React from 'react';

function CellAction() {

  const [openSheet, setOpenSheet] = React.useState(false)
  const [selectedWorkItem, setSelectedWorkItem] = React.useState<WorkItem | null>(null);
  const handleWorkItemClick = (workItem: WorkItem) => {
    setOpenSheet(true)
    setSelectedWorkItem(workItem);
  }


  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <Ellipsis className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem
            onClick={() => {
              setOpenSheet(true);
            }}
          >
            Edit
          </DropdownMenuItem>

          <DropdownMenuItem>Make a copy</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Inactive / Active</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* <CreateForm initialValues={selectedWorkItem} workItems={workItems} setOpenSheet={setOpenSheet} openSheet={openSheet} /> */}
    </>
  );
}

export default CellAction;
