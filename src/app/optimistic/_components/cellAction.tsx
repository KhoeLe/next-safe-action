import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
// import UserForm from './user-form';
import { useState } from 'react';

function CellAction() {
  const [openSheet, setOpenSheet] = useState<boolean>(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
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

      {/* <UserForm openSheet={openSheet} setOpenSheet={setOpenSheet} /> */}
    </>
  );
}

export default CellAction;
