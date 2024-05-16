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
import { WorkItem } from '@/db/schema';
import { Ellipsis, ShieldBan } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { deleteForm } from './create-form-action';
import { toast } from 'sonner';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { usePreviewModalWorkItemStore } from '@/store/workItem-store';

type Props = {
  data: WorkItem
}

function CellAction({ data }: Props) {

  const { isOpen, setOpenSheet, setSelectedWorkItem } = usePreviewModalWorkItemStore((state) => state)

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success('Product ID copied to clipboard.');
  }

  const { execute: deleteWorkItem, result: resultDelete, status: statusDelete } = useAction(deleteForm, {
    onSuccess: () => {
      toast.success("Work item delete successful")
    },
    onError: (error) => {
      setOpenSheet(true)
      // toast.error("Something went wrong while executing the operation.")
    },

  },);

  const handleDelete = async () => {
    if (!data.id) {
      toast.error("No id found for the work item")
    }
    deleteWorkItem({ id: data.id });
  }



  return (
    <>
      <DropdownMenu >
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <Ellipsis className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[160px]">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem
            onClick={() => {
              setOpenSheet(true);
              setSelectedWorkItem(data);
            }}
          >
            Edit
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => onCopy(data.id)}>Make a copy</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem   onClick={handleDelete}>
            <TooltipProvider delayDuration={200} >
              <Tooltip  >
                <TooltipTrigger  >
                  <ShieldBan className='h-6 w-6 rounded-md bg-destructive text-destructive-foreground hover:bg-destructive/90' />
                </TooltipTrigger>
                <TooltipContent side='bottom'>
                  <p className='text-sm font-light'>Inactive item</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

    </>
  );
}

export default CellAction;
