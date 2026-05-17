import { Button } from '@/components/ui/button'
import type { Event } from '@/lib/types'

type EventCardProps = {
  event: Event
  onEdit: (event: Event) => void
  onDelete: (event: Event) => void
}

export function EventCard({ event, onEdit, onDelete }: EventCardProps) {
  const date = new Date(event.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })

  return (
    <article className="rounded-2xl border border-cloud-fog bg-parchment-white p-5">
      <p className="text-[13px] text-muted-stone">{date}</p>
      <h3 className="heading-sm mt-2">{event.title}</h3>
      {event.location ? <p className="mt-3 text-pressed-cacao">{event.location}</p> : null}
      {event.notes ? <p className="mt-3 text-muted-stone">{event.notes}</p> : null}
      <div className="mt-5 flex gap-2">
        <Button type="button" variant="tertiary" onClick={() => onEdit(event)}>Edit</Button>
        <Button type="button" variant="secondary" onClick={() => onDelete(event)}>Delete</Button>
      </div>
    </article>
  )
}
