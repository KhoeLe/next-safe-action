"use client"
import React, { useRef, useTransition } from 'react'
import { signup } from './signup-action'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useAction } from 'next-safe-action/hooks';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Terminal } from 'lucide-react'
import { Label } from './ui/label'
import { toast } from "sonner"

function LoginForm() {

  const ref = useRef<HTMLFormElement>(null);
  const { execute, result, status } = useAction(signup, {
    onSuccess: () => {
      ref.current?.reset()
      console.log('Success')
      toast.success("Sign up successful")
    },
    onError: (error) => {
      console.log('Error:', error)
      toast.error("An error occurred.")
    },
  });


  return (
    <div className=''>
      <form className='space-y-4' ref={ref} onSubmit={async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement);

        const data = {
          email: formData.get('email') as string,
          password: formData.get('password') as string
        }
        await execute(data)
      }} >
        <fieldset className='space-y-4' disabled={status === 'executing'}>
          <div className='space-y-2'>
            <Label htmlFor="email">Email</Label>
            <Input type="text" name="email" placeholder="name@example.com" autoComplete='username' />
            {
              status === 'hasErrored' && (
                <div className='text-red-500 text-sm'>
                  {result.validationErrors?.email}
                </div>
              )
            }
          </div>
          <div className='space-y-2'>
            <Label htmlFor="password">Password</Label>
            <Input type="password" name="password" placeholder="current-password"  autoComplete='current-password'/>
            {
              status === 'hasErrored' && (
                <div className='text-red-500 text-sm'>
                  {result.validationErrors?.password}
                </div>
              )
            }
          </div>

          <Button type="submit">Signup</Button>

        </fieldset>
      </form>

      <div className='mt-4'>
        {status === 'hasErrored' && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{result.serverError}</AlertDescription>
          </Alert>
        )}
        {status === 'hasSucceeded' && (
          <Alert variant="default">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>Signup successful</AlertDescription>
          </Alert>
        )}

      </div>
    </div>
  )
}

export default LoginForm