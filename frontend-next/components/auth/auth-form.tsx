'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'
import { storeSession } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Toast } from '@/components/ui/toast'

type AuthFormProps = { mode: 'sign-in' | 'sign-up' }

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter()
  const [status, setStatus] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const isSignUp = mode === 'sign-up'

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setStatus('Preparing your workspace...')

    const form = new FormData(event.currentTarget)
    const email = String(form.get('email') ?? '')
    const password = String(form.get('password') ?? '')

    try {
      const response = isSignUp
        ? await api.register(String(form.get('name') ?? ''), email, password, String(form.get('password_confirmation') ?? ''))
        : await api.login(email, password)

      storeSession(response.token, response.user)
      router.push('/app')
    } catch (caught) {
      setStatus(null)
      setError(caught instanceof Error ? caught.message : 'Authentication failed')
    }
  }

  return (
    <Card className="mx-auto w-full max-w-md">
      <h1 className="section-heading">{isSignUp ? 'Create your account' : 'Welcome back'}</h1>
      <p className="mt-3 text-muted-stone">{isSignUp ? 'Start planning in the new AcaraKita workspace.' : 'Sign in to continue managing your events.'}</p>
      <form className="mt-8 grid gap-4" onSubmit={onSubmit}>
        {isSignUp ? <Input label="Name" name="name" required minLength={3} /> : null}
        <Input label="Email" name="email" type="email" required />
        <Input label="Password" name="password" type="password" required minLength={6} />
        {isSignUp ? <Input label="Confirm password" name="password_confirmation" type="password" required minLength={6} /> : null}
        <Button type="submit">{isSignUp ? 'Create account' : 'Sign in'}</Button>
      </form>
      {status ? <div className="mt-4"><Toast message={status} /></div> : null}
      {error ? <div className="mt-4"><Toast message={error} tone="error" /></div> : null}
    </Card>
  )
}
