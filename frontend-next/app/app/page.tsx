'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Panel } from '@/components/ui/card'
import { Toast } from '@/components/ui/toast'
import { EventCard } from '@/components/app/event-card'
import { EventForm } from '@/components/app/event-form'
import { api } from '@/lib/api'
import type { DashboardData, Event, EventInput, Holiday, WeatherData } from '@/lib/types'

export default function AppDashboardPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [dashboard, setDashboard] = useState<DashboardData | null>(null)
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [holidays, setHolidays] = useState<Holiday[]>([])
  const [editing, setEditing] = useState<Event | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function loadData() {
    const [eventData, dashboardData, weatherData, holidayData] = await Promise.allSettled([
      api.events(),
      api.dashboard(),
      api.weather(),
      api.holidays(),
    ])

    if (eventData.status === 'fulfilled') setEvents(eventData.value)
    if (dashboardData.status === 'fulfilled') setDashboard(dashboardData.value)
    if (weatherData.status === 'fulfilled') setWeather(weatherData.value)
    if (holidayData.status === 'fulfilled') setHolidays(holidayData.value)
  }

  useEffect(() => {
    loadData().catch((caught) => setError(caught instanceof Error ? caught.message : 'Could not load dashboard'))
  }, [])

  async function saveEvent(input: EventInput) {
    setError(null)
    if (editing) {
      await api.updateEvent(editing._id, input)
      setMessage('Event updated')
    } else {
      await api.createEvent(input)
      setMessage('Event created')
    }
    setShowForm(false)
    setEditing(null)
    await loadData()
  }

  async function deleteEvent(event: Event) {
    setError(null)
    await api.deleteEvent(event._id)
    setMessage('Event deleted')
    await loadData()
  }

  return (
    <main className="mx-auto grid max-w-6xl gap-5 px-6 py-8 lg:grid-cols-[1fr_320px]">
      <section className="grid gap-5">
        <div className="flex flex-col gap-4 rounded-[20px] bg-parchment-white p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[13px] uppercase tracking-[0.2em] text-pressed-cacao">Command center</p>
            <h1 className="section-heading">Events</h1>
          </div>
          <Button type="button" onClick={() => { setEditing(null); setShowForm(true) }}>New Event</Button>
        </div>

        {message ? <Toast message={message} tone="success" /> : null}
        {error ? <Toast message={error} tone="error" /> : null}
        {showForm ? <EventForm event={editing} onSubmit={saveEvent} onCancel={() => { setShowForm(false); setEditing(null) }} /> : null}

        <div className="grid gap-4 md:grid-cols-2">
          {events.map((event) => (
            <EventCard key={event._id} event={event} onEdit={(nextEvent) => { setEditing(nextEvent); setShowForm(true) }} onDelete={deleteEvent} />
          ))}
        </div>

        {events.length === 0 ? (
          <Panel>
            <h2 className="heading-sm">No events yet</h2>
            <p className="mt-3 text-muted-stone">Create your first gathering to begin composing your calendar.</p>
          </Panel>
        ) : null}
      </section>

      <aside className="grid gap-5 self-start">
        <Panel>
          <h2 className="heading-sm">Calendar context</h2>
          <p className="mt-3 text-muted-stone">{events.length} events currently in your workspace.</p>
        </Panel>
        <Panel>
          <h2 className="heading-sm">Weather</h2>
          <p className="mt-3 text-muted-stone">{weather?.description ?? weather?.condition ?? 'Weather context will appear when available.'}</p>
        </Panel>
        <Panel>
          <h2 className="heading-sm">Holidays</h2>
          <ul className="mt-3 grid gap-2 text-muted-stone">
            {holidays.slice(0, 4).map((holiday) => <li key={`${holiday.date}-${holiday.name}`}>{holiday.date} · {holiday.name}</li>)}
            {holidays.length === 0 ? <li>No holiday data loaded.</li> : null}
          </ul>
        </Panel>
        <Panel>
          <h2 className="heading-sm">Stats</h2>
          <p className="mt-3 text-muted-stone">Total events: {dashboard?.totalEvents ?? events.length}</p>
        </Panel>
      </aside>
    </main>
  )
}
