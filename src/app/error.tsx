'use client' // Error components must be Client Components

import { Button } from '@/components/ui/button'
import { ServerCrash } from 'lucide-react'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className='flex mt-24 justify-center items-center'>
      <div className="flex items-center flex-col justify-center p-8 bg-white rounded-lg shadow-md my-20">
      <ServerCrash className='w-48 h-40 text-red-600 animate-bounce' />
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Oups! Something went wrong!</h1>
      <p className="text-gray-600 text-center mb-6">
        We encountered an error while trying to add you to our list. Will you please try one more time? Pretty please?
        🥺
      </p>
      <Button variant={'outline'} onClick={() => reset()} >
        Try again
      </Button>
    </div>
    </div>
  )
}