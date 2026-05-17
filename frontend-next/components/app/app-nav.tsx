'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { clearSession, getStoredUser } from '@/lib/auth'
import { Button } from '@/components/ui/button'

const navItems = [
  ['Dashboard', '/app'],
  ['Search', '/app/search'],
  ['Profile', '/app/profile'],
]

export function AppNav() {
  const pathname = usePathname()
  const router = useRouter()
  const user = getStoredUser()

  return (
    <header className="border-b border-cloud-fog bg-parchment-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:justify-between">
        <div>
          <Link className="heading-sm" href="/app">AcaraKita</Link>
          <p className="text-[13px] text-muted-stone">{user?.name ?? 'Your event workspace'}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {navItems.map(([label, href]) => {
            const active = pathname === href
            return (
              <Link key={href} className={`rounded-xl px-3 py-2 text-[15px] ${active ? 'bg-cloud-fog text-deep-cognac' : 'text-muted-stone hover:text-deep-cognac'}`} href={href}>
                {label}
              </Link>
            )
          })}
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              clearSession()
              router.push('/sign-in')
            }}
          >
            Sign out
          </Button>
        </div>
      </nav>
    </header>
  )
}
