import { ButtonLink } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

const features = [
  ['A calmer event command center', 'Create, review, and refine your event plans from a focused workspace.'],
  ['Search across every detail', 'Find events by title, notes, date, or location through the existing GraphQL search.'],
  ['Context without clutter', 'Calendar, weather, holidays, and stats stay close without overwhelming the main task.'],
]

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-parchment-white text-deep-cognac">
      <header className="sticky top-0 z-10 border-b border-cloud-fog bg-parchment-white/90 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="heading-sm">AcaraKita</span>
          <div className="flex items-center gap-3 text-[15px] text-muted-stone">
            <a className="hidden px-3 py-2 hover:text-deep-cognac sm:inline" href="#features">Features</a>
            <ButtonLink href="/sign-in" variant="auth">Sign in</ButtonLink>
          </div>
        </nav>
      </header>

      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-24 text-center lg:py-28">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-[13px] uppercase tracking-[0.24em] text-pressed-cacao">Cognac-stained event planning</p>
          <h1 className="display-heading">Plan every gathering with quiet confidence.</h1>
          <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-7 text-muted-stone">
            AcaraKita brings your events, calendar context, weather, and notes into a warm editorial workspace made for thoughtful planning.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href="/sign-up">Start planning</ButtonLink>
            <ButtonLink href="/sign-in" variant="secondary">I already have an account</ButtonLink>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="rotate-[-1deg] text-left">
            <p className="text-[13px] text-muted-stone">Upcoming</p>
            <h2 className="heading-sm mt-3">Dinner with the design circle</h2>
            <p className="mt-4 text-muted-stone">Friday · 19:30 · Rumah Kopi Palu</p>
          </Card>
          <Card className="translate-y-4 text-left md:translate-y-8">
            <p className="text-[13px] text-muted-stone">Weather note</p>
            <h2 className="heading-sm mt-3">Clear evening, light breeze.</h2>
            <p className="mt-4 text-muted-stone">A better night for an outdoor table.</p>
          </Card>
          <Card className="rotate-[1deg] text-left">
            <p className="text-[13px] text-muted-stone">Search insight</p>
            <h2 className="heading-sm mt-3">Found 4 events tagged “community”.</h2>
            <p className="mt-4 text-muted-stone">Your notes stay discoverable when plans change.</p>
          </Card>
        </div>
      </section>

      <section id="features" className="bg-cloud-fog px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="section-heading max-w-3xl">A product shell designed to make planning feel composed.</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {features.map(([title, body]) => (
              <Card key={title}>
                <h3 className="heading-sm">{title}</h3>
                <p className="mt-4 text-muted-stone">{body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
