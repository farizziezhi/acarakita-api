'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getToken } from '@/lib/auth'
import { AppNav } from '@/components/app/app-nav'

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!getToken()) {
      router.replace('/sign-in')
      return
    }

    setReady(true)
  }, [router])

  if (!ready) {
    return <main className="grid min-h-screen place-items-center bg-parchment-white text-muted-stone">Opening your workspace...</main>
  }

  return (
    <div className="min-h-screen bg-cloud-fog text-deep-cognac">
      <AppNav />
      {children}
    </div>
  )
}
