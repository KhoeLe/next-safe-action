'use client'
import { createForm, deleteForm, updateForm } from '@/app/work-items/_components/create-form-action'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { WorkItem } from '@/db/schema'
import { cn } from '@/lib/utils'
import { Loader, Trash2 } from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'
import React, { useRef } from 'react'
import { toast } from 'sonner'

interface Props {
  openSheet: boolean,
  workItems: WorkItem[]
  initialValues?: WorkItem | null | undefined,
  setOpenSheet: (open: boolean) => void

}


function CreateForm({ openSheet, setOpenSheet, initialValues }: Props) {
  const ref = useRef<HTMLFormElement>(null);

  const extractFormData = (e: React.FormEvent<HTMLFormElement>, initialValues?: WorkItem | null) => {
    const formData = new FormData(e.target as HTMLFormElement);
    const getValue = (name: string, defaultValue: any) => (formData.get(name) as string)

    return {
      title: getValue('title', ''),
      assignee: getValue('assignee', ''),
      status: getValue('status', 'to do') as "to do" | "in process" | "done",
      priority: getValue('priority', 'normal') as "high" | "low" | "normal",
      type: getValue('type', 'task') as "bug" | "feature" | "task",
      description: getValue('description', '')
    };
  }

  const { execute: createWorkItem, result: resultCreate, status: statusCreate, reset: resetCreate  } = useAction(createForm, {
    onSuccess: () => {
      ref.current?.reset()
      setOpenSheet(false)
      toast.success("Work item creation successful")
    },
    onError: (error) => {
      setOpenSheet(true)
     // toast.error("Something went wrong while executing the operation.")
    },
    onExecute: () => {
      setOpenSheet(true)
    }
  });

  const { execute: updateWorkItem, result: resultUpdate, status: statusUpdate , reset: resetUpdate} = useAction(updateForm, {
    onSuccess: () => {
      ref.current?.reset()
      setOpenSheet(false)
      toast.success("Work item update successful")

    },
    onError: (error) => {
      console.log(error)

      setOpenSheet(true)
     // toast.error("Something went wrong while executing the operation.")
    },
    onExecute: () => {
      setOpenSheet(true)
    }
  },);

  const { execute: deleteWorkItem, result: resultDelete, status: statusDelete } = useAction(deleteForm, {
    onSuccess: () => {
      ref.current?.reset()
      setOpenSheet(false)
      toast.success("Work item delete successful")
    },
    onError: (error) => {
      setOpenSheet(true)
     // toast.error("Something went wrong while executing the operation.")
    },
    onExecute: () => {
      setOpenSheet(true)
    }
  },);



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = extractFormData(e, initialValues);

    if (initialValues?.id) {
      updateWorkItem({ ...formData, id: initialValues.id });
    } else {
      createWorkItem(formData);
    }
  };


  const handleDelete = async (id: string) => {
    if (!id) {
      toast.error("No id found for the work item")
    }

    deleteWorkItem({ id });
  }

  React.useEffect(() => {
    if (!openSheet) {
      resetUpdate()
      resetCreate()
    }
  }, [openSheet, resetCreate, resetUpdate]);

  return (
    <Sheet open={openSheet} onOpenChange={setOpenSheet} >
      <SheetTrigger asChild>
        <Button variant={'outline'} onClick={() => {
          setOpenSheet(true);
        }}>
          Add work item
        </Button>
      </SheetTrigger>
      <SheetContent onOpenAutoFocus={(event) => event.preventDefault()} className="sm:w-[840px]">
        <SheetHeader>
          <SheetTitle>
            <div className='my-4 flex justify-between'>
              <div className='text-3xl'>
                {initialValues?.id ? 'Edit work item' : 'Work item'}
              </div>
              <div>
                
                  <TooltipProvider  delayDuration={200} >
                  <Tooltip  >
                    <TooltipTrigger asChild>
                      
                      {initialValues?.id && (
                      <Button size={'icon'} variant={'destructive'} onClick={() => handleDelete(initialValues?.id ?? '')} >
                        <Trash2 className='h-4 w-4 ' />
                      </Button>)}
                    </TooltipTrigger>
                    <TooltipContent  side='bottom'>
                      <p className='text-sm font-light'>Delete item</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              
              </div>

            </div>
          </SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.


          </SheetDescription>
        </SheetHeader>
        <form className='space-y-4' ref={ref} onSubmit={handleSubmit} >
          <fieldset className='space-y-4' disabled={statusCreate === 'executing' || statusUpdate === 'executing'}>
            <div className='space-y-2'>
              <Label htmlFor="title">Title</Label>
              <Input type="text" name="title" placeholder="Do some thing" autoComplete='title' defaultValue={initialValues?.title} />
              {
                (statusUpdate === 'hasErrored' || statusCreate === 'hasErrored') && (
                  <div className='text-red-500 text-sm'>
                    {resultCreate.validationErrors?.title}
                    {resultUpdate.validationErrors?.title}
                  </div>
                )
              }
            </div>
            <div className='space-y-2'>
              <Label htmlFor="assignee">Assignee</Label>
              <Select name='assignee' defaultValue={initialValues?.assignee || 'light'} >
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
              {
                (statusUpdate === 'hasErrored' || statusCreate === 'hasErrored') && (
                  <div className='text-red-500 text-sm'>
                    {resultCreate.validationErrors?.assignee}
                    {resultUpdate.validationErrors?.assignee}
                  </div>
                )
              }
            </div>
            <div className=' grid md:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-2 '>

              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select name='priority' defaultValue={initialValues?.priority?.toString() || 'normal'}  >
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high"> <span className="!text-red-600 focus:!text-red-600 font-base" >High</span></SelectItem>
                    <SelectItem value="normal"> <span className="!text-yellow-600 font-base" >Normal</span></SelectItem>
                    <SelectItem value="low"><span className="!text-green-600 font-base" >Low</span></SelectItem>
                  </SelectContent>

                </Select>
                {
                  (statusUpdate === 'hasErrored' || statusCreate === 'hasErrored') && (
                    <div className='text-red-500 text-sm'>
                      {resultCreate.validationErrors?.priority}
                      {resultUpdate.validationErrors?.priority}
                    </div>
                  )
                }
              </div>
              <div>
                <Label htmlFor="type">Type</Label>
                <Select name='type' defaultValue={initialValues?.type?.toString() || "task"}   >
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bug"><span className="!text-red-600 font-base">Bug</span></SelectItem>
                    <SelectItem value="feature"> <span className="!text-cyan-600 font-base">Feature</span></SelectItem>
                    <SelectItem value="task"><span className="!text-fuchsia-600 font-base">Task</span></SelectItem>
                  </SelectContent>
                </Select>
                {
                  statusCreate === 'hasErrored' && (
                    <div className='text-red-500 text-sm'>
                      {resultCreate.validationErrors?.type}
                      {resultCreate.validationErrors?.type}
                    </div>
                  )
                }
              </div>
              <div >
                <Label htmlFor="status">Status</Label>
                <Select name='status' defaultValue={initialValues?.status?.toString() || 'to do'}  >
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="to do">
                      <span className={cn("text-red-600 hover:text-red-600")}>
                        To Do
                      </span>
                    </SelectItem>
                    <SelectItem value="in process">
                      <span className={cn("!text-yellow-600 font-base")}>In Process</span> </SelectItem>
                    <SelectItem value="done"><span className={cn("!text-green-600 font-base")}>Done</span></SelectItem>
                  </SelectContent>
                </Select>
                {
                  (statusUpdate === 'hasErrored' || statusCreate === 'hasErrored') && (
                    <div className='text-red-500 text-sm'>
                      {resultCreate.validationErrors?.status}
                      {resultUpdate.validationErrors?.status}
                    </div>
                  )
                }
              </div>
            </div>
            <div className='space-y-2'>
              <Label htmlFor="description">Description</Label>
              <Textarea name='description' placeholder="Type your message here." defaultValue={initialValues?.description} />
              {
                (statusUpdate === 'hasErrored' || statusCreate === 'hasErrored') && (
                  <div className='text-red-500 text-sm'>
                    {resultCreate.validationErrors?.description}
                    {resultUpdate.validationErrors?.description}
                  </div>
                )

              }
            </div>

            <SheetFooter>
              <Button type="submit">
                {initialValues?.id ? 'Save changes' : 'Create work item'}
                {(statusUpdate === 'executing' || statusCreate === 'executing')
                  ? <><Loader className='w-6 h-6 animate-spin mx-2' /></>
                  : ''}
              </Button>
            </SheetFooter>

          </fieldset>
        </form>
      </SheetContent>
    </Sheet>
  )
}

export default CreateForm