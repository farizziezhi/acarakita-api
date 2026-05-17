'use client'

import { FormEvent, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Panel } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Toast } from '@/components/ui/toast'
import { EventCard } from '@/components/app/event-card'
import { api } from '@/lib/api'
import type { Event } from '@/lib/types'

export default function SearchPage() {
  const [results, setResults] = useState<Event[]>([])
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    const form = new FormData(event.currentTarget)
    const term = String(form.get('term') ?? '')
    const graphql = `query { searchEvents(search: "${term.replaceAll('"', '\\"')}") { _id title date location notes } }`

    try {
      const response = await api.searchEvents(graphql)
      setResults(response.data?.searchEvents ?? response.data?.events ?? [])
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Search failed')
    }
  }

  return (
    <main className="mx-auto grid max-w-6xl gap-5 px-6 py-8">
      <Panel>
        <p className="text-[13px] uppercase tracking-[0.2em] text-pressed-cacao">GraphQL search</p>
        <h1 className="section-heading">Find the exact event.</h1>
        <form className="mt-6 flex flex-col gap-3 md:flex-row" onSubmit={onSubmit}>
          <div className="flex-1"><Input label="Search title, date, location, or notes" name="term" required /></div>
          <Button className="self-end" type="submit">Search</Button>
        </form>
      </Panel>
      {error ? <Toast message={error} tone="error" /> : null}
      <div className="grid gap-4 md:grid-cols-2">
        {results.map((event) => <EventCard key={event._id} event={event} onEdit={() => undefined} onDelete={() => undefined} />)}
      </div>
      {results.length === 0 ? <Panel><h2 className="heading-sm">No results yet</h2><p className="mt-3 text-muted-stone">Search for an event to see matching plans.</p></Panel> : null}
    </main>
  )
}
