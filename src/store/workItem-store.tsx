import { WorkItem } from '@/db/schema'
import { create } from 'zustand'

interface PreviewModalWorkItemState {
  isOpen: boolean
  selectedWorkItem : WorkItem | null,
  setSelectedWorkItem : (workItem: WorkItem) => void,
  setOpenSheet: (open: boolean) => void
}



export const usePreviewModalWorkItemStore = create<PreviewModalWorkItemState>((set, get) => ({
  isOpen: false,
  selectedWorkItem: null,
  setOpenSheet: (open: boolean) => set({isOpen: open}),
  setSelectedWorkItem: (workItem: WorkItem) => set({selectedWorkItem: workItem})
  
}))

