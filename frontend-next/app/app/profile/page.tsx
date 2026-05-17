'use client'

import { FormEvent, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Panel } from '@/components/ui/card'
import { Input, Textarea } from '@/components/ui/input'
import { Toast } from '@/components/ui/toast'
import { api } from '@/lib/api'
import type { User } from '@/lib/types'

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    api.profile().then(setUser).catch((caught) => setError(caught instanceof Error ? caught.message : 'Could not load profile'))
  }, [])

  async function updateProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    setError(null)
    const updated = await api.updateProfile({
      name: String(form.get('name') ?? ''),
      phone: String(form.get('phone') ?? ''),
      address: String(form.get('address') ?? ''),
      bio: String(form.get('bio') ?? ''),
      location: String(form.get('location') ?? ''),
    })
    setUser(updated)
    setMessage('Profile updated')
  }

  async function resetPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    setError(null)
    await api.resetPassword(String(form.get('password') ?? ''), String(form.get('password_confirmation') ?? ''))
    setMessage('Password updated')
    event.currentTarget.reset()
  }

  return (
    <main className="mx-auto grid max-w-4xl gap-5 px-6 py-8">
      <Panel>
        <p className="text-[13px] uppercase tracking-[0.2em] text-pressed-cacao">Profile</p>
        <h1 className="section-heading">Your account details.</h1>
      </Panel>
      {message ? <Toast message={message} tone="success" /> : null}
      {error ? <Toast message={error} tone="error" /> : null}
      <Panel>
        <h2 className="heading-sm">Identity</h2>
        <form className="mt-5 grid gap-4" onSubmit={updateProfile}>
          <Input label="Name" name="name" required defaultValue={user?.name ?? ''} />
          <Input label="Email" name="email" type="email" disabled defaultValue={user?.email ?? ''} />
          <Input label="Phone" name="phone" defaultValue={user?.phone ?? ''} />
          <Input label="Location" name="location" defaultValue={user?.location ?? ''} />
          <Textarea label="Bio" name="bio" defaultValue={user?.bio ?? ''} />
          <Textarea label="Address" name="address" defaultValue={user?.address ?? ''} />
          <Button type="submit">Save profile</Button>
        </form>
      </Panel>
      <Panel>
        <h2 className="heading-sm">Security</h2>
        <form className="mt-5 grid gap-4" onSubmit={resetPassword}>
          <Input label="New password" name="password" type="password" required minLength={6} />
          <Input label="Confirm new password" name="password_confirmation" type="password" required minLength={6} />
          <Button type="submit" variant="secondary">Update password</Button>
        </form>
      </Panel>
    </main>
  )
}
