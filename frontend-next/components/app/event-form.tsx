'use client'

import { FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input, Textarea } from '@/components/ui/input'
import type { Event, EventInput } from '@/lib/types'

type EventFormProps = {
  event?: Event | null
  onSubmit: (input: EventInput) => Promise<void>
  onCancel: () => void
}

export function EventForm({ event, onSubmit, onCancel }: EventFormProps) {
  async function handleSubmit(formEvent: FormEvent<HTMLFormElement>) {
    formEvent.preventDefault()
    const form = new FormData(formEvent.currentTarget)
    await onSubmit({
      title: String(form.get('title') ?? ''),
      date: String(form.get('date') ?? ''),
      location: String(form.get('location') ?? ''),
      notes: String(form.get('notes') ?? ''),
    })
  }

  return (
    <form className="grid gap-4 rounded-[20px] border border-muted-stone bg-parchment-white p-5" onSubmit={handleSubmit}>
      <h2 className="heading-sm">{event ? 'Edit event' : 'New event'}</h2>
      <Input label="Title" name="title" required defaultValue={event?.title ?? ''} />
      <Input label="Date" name="date" type="date" required defaultValue={event?.date ? event.date.slice(0, 10) : ''} />
      <Input label="Location" name="location" defaultValue={event?.location ?? ''} />
      <Textarea label="Notes" name="notes" defaultValue={event?.notes ?? ''} />
      <div className="flex gap-2">
        <Button type="submit">Save event</Button>
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  )
}
