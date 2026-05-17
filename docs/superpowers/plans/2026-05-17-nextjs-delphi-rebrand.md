# Next.js Delphi Rebrand Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a new `frontend-next/` Next.js application that rebrands AcaraKita with the Delphi parchment design while consuming the existing AdonisJS API.

**Architecture:** Add a separate Next.js app under `frontend-next/` and leave the AdonisJS backend unchanged unless a verified API mismatch blocks the UI. The frontend owns routing, session persistence, UI state, and presentation; the backend remains the source of truth for auth, events, profile, dashboard data, weather, holidays, and GraphQL search.

**Tech Stack:** Next.js App Router, TypeScript, Tailwind CSS v4, React, Source Serif 4, Inter, existing AdonisJS REST/GraphQL API.

---

## File Structure

Create these files in the new app:

- `frontend-next/package.json` — Next.js app scripts and dependencies.
- `frontend-next/pnpm-lock.yaml` — pnpm dependency lockfile.
- `frontend-next/tsconfig.json` — TypeScript configuration.
- `frontend-next/next.config.ts` — Next.js configuration.
- `frontend-next/postcss.config.mjs` — Tailwind PostCSS configuration.
- `frontend-next/eslint.config.mjs` — Next.js lint configuration.
- `frontend-next/app/globals.css` — Delphi tokens, Tailwind theme, base styles, reusable utility classes.
- `frontend-next/app/layout.tsx` — root HTML shell and font wiring.
- `frontend-next/app/page.tsx` — editorial landing page.
- `frontend-next/app/sign-in/page.tsx` — login page.
- `frontend-next/app/sign-up/page.tsx` — registration page.
- `frontend-next/app/app/layout.tsx` — authenticated app shell.
- `frontend-next/app/app/page.tsx` — two-column dashboard command center.
- `frontend-next/app/app/profile/page.tsx` — profile and account settings page.
- `frontend-next/app/app/search/page.tsx` — GraphQL event search page.
- `frontend-next/components/ui/button.tsx` — shared button component.
- `frontend-next/components/ui/input.tsx` — shared input component.
- `frontend-next/components/ui/card.tsx` — shared card component.
- `frontend-next/components/ui/toast.tsx` — lightweight toast/status component.
- `frontend-next/components/auth/auth-form.tsx` — shared sign-in/sign-up form.
- `frontend-next/components/app/app-nav.tsx` — authenticated navigation.
- `frontend-next/components/app/event-card.tsx` — event card display and actions.
- `frontend-next/components/app/event-form.tsx` — event create/edit form.
- `frontend-next/lib/api.ts` — typed API client for existing AdonisJS endpoints.
- `frontend-next/lib/auth.ts` — JWT/session storage helpers.
- `frontend-next/lib/types.ts` — frontend API/domain types.
- `frontend-next/.env.example` — `NEXT_PUBLIC_API_BASE_URL` example.

Modify these existing files:

- `.gitignore` — ignore `.superpowers/`, `.claude/`, and `frontend-next/.next/` / `frontend-next/node_modules/` if missing.

Do not modify backend files during the initial frontend implementation.

---

### Task 1: Scaffold the Next.js app

**Files:**
- Create: `frontend-next/package.json`
- Create: `frontend-next/tsconfig.json`
- Create: `frontend-next/next.config.ts`
- Create: `frontend-next/postcss.config.mjs`
- Create: `frontend-next/eslint.config.mjs`
- Create: `frontend-next/.env.example`
- Modify: `.gitignore`

- [ ] **Step 1: Create `frontend-next/package.json`**

```json
{
  "name": "acarakita-frontend-next",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@tailwindcss/postcss": "latest",
    "next": "latest",
    "react": "latest",
    "react-dom": "latest",
    "tailwindcss": "latest"
  },
  "devDependencies": {
    "@eslint/eslintrc": "latest",
    "@types/node": "latest",
    "@types/react": "latest",
    "@types/react-dom": "latest",
    "eslint": "latest",
    "eslint-config-next": "latest",
    "typescript": "latest"
  }
}
```

- [ ] **Step 2: Create `frontend-next/tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 3: Create config files**

`frontend-next/next.config.ts`:

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {}

export default nextConfig
```

`frontend-next/postcss.config.mjs`:

```js
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}

export default config
```

`frontend-next/eslint.config.mjs`:

```js
import { FlatCompat } from '@eslint/eslintrc'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({ baseDirectory: __dirname })

const eslintConfig = [...compat.extends('next/core-web-vitals', 'next/typescript')]

export default eslintConfig
```

- [ ] **Step 4: Create `frontend-next/.env.example`**

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3333
```

- [ ] **Step 5: Update `.gitignore`**

Add these lines if they are not already present:

```gitignore
.claude/
.superpowers/
frontend-next/.next/
frontend-next/node_modules/
frontend-next/out/
```

- [ ] **Step 6: Install frontend dependencies**

Run:

```bash
pnpm install --dir frontend-next
```

Expected: `frontend-next/pnpm-lock.yaml` is created and install exits with code 0.

- [ ] **Step 7: Commit scaffold**

```bash
git add .gitignore frontend-next/package.json frontend-next/pnpm-lock.yaml frontend-next/tsconfig.json frontend-next/next.config.ts frontend-next/postcss.config.mjs frontend-next/eslint.config.mjs frontend-next/.env.example
git commit -m "Add Next.js frontend scaffold"
```

---

### Task 2: Add Delphi styling foundation and UI primitives

**Files:**
- Create: `frontend-next/app/globals.css`
- Create: `frontend-next/app/layout.tsx`
- Create: `frontend-next/components/ui/button.tsx`
- Create: `frontend-next/components/ui/input.tsx`
- Create: `frontend-next/components/ui/card.tsx`
- Create: `frontend-next/components/ui/toast.tsx`

- [ ] **Step 1: Create `frontend-next/app/globals.css`**

```css
@import 'tailwindcss';

@theme {
  --color-parchment-white: #fdf6ee;
  --color-deep-cognac: #2b180a;
  --color-muted-stone: #94877c;
  --color-pressed-cacao: #7f6e60;
  --color-burnt-umber: #3e2407;
  --color-warm-ash: #a99d93;
  --color-cloud-fog: #f0e6dc;
  --color-fire-opal: #f65726;
  --color-sunset-orange: #ff5c00;
  --color-white: #ffffff;
  --color-dark-charcoal: #21201c;
  --font-serif-display: var(--font-source-serif);
  --font-inter: var(--font-inter);
}

:root {
  color: #2b180a;
  background: #fdf6ee;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: #fdf6ee;
  color: #2b180a;
  font-family: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  font-size: 15px;
  line-height: 1.4;
  letter-spacing: -0.01px;
}

a {
  color: inherit;
  text-decoration: none;
}

button,
input,
textarea {
  font: inherit;
}

.display-heading {
  font-family: var(--font-source-serif), Georgia, serif;
  font-size: clamp(48px, 8vw, 64px);
  font-weight: 300;
  line-height: 1.05;
  letter-spacing: -1.92px;
}

.section-heading {
  font-family: var(--font-source-serif), Georgia, serif;
  font-size: clamp(32px, 5vw, 56px);
  font-weight: 300;
  line-height: 1.12;
  letter-spacing: -1.23px;
}

.heading-sm {
  font-family: var(--font-source-serif), Georgia, serif;
  font-size: 24px;
  font-weight: 400;
  line-height: 1.22;
  letter-spacing: -0.48px;
}

.soft-shadow {
  box-shadow: 0 18px 60px rgba(62, 36, 7, 0.08);
}
```

- [ ] **Step 2: Create `frontend-next/app/layout.tsx`**

```tsx
import type { Metadata } from 'next'
import { Inter, Source_Serif_4 } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const sourceSerif = Source_Serif_4({ subsets: ['latin'], variable: '--font-source-serif' })

export const metadata: Metadata = {
  title: 'AcaraKita',
  description: 'A refined way to plan, search, and manage social events.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${sourceSerif.variable}`}>{children}</body>
    </html>
  )
}
```

- [ ] **Step 3: Create `frontend-next/components/ui/button.tsx`**

```tsx
import Link from 'next/link'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'tertiary' | 'auth'

const variants: Record<Variant, string> = {
  primary: 'bg-burnt-umber text-white hover:bg-deep-cognac',
  secondary: 'border border-muted-stone bg-parchment-white text-deep-cognac hover:bg-cloud-fog',
  tertiary: 'bg-cloud-fog text-deep-cognac hover:bg-[#e7dbcf]',
  auth: 'bg-white text-deep-cognac hover:bg-cloud-fog',
}

const baseClass = 'inline-flex items-center justify-center rounded-xl px-4 py-3 text-[15px] font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
}

export function Button({ className = '', variant = 'primary', ...props }: ButtonProps) {
  return <button className={`${baseClass} ${variants[variant]} ${className}`} {...props} />
}

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
  children: ReactNode
  variant?: Variant
}

export function ButtonLink({ className = '', variant = 'primary', href, children, ...props }: ButtonLinkProps) {
  return (
    <Link className={`${baseClass} ${variants[variant]} ${className}`} href={href} {...props}>
      {children}
    </Link>
  )
}
```

- [ ] **Step 4: Create `frontend-next/components/ui/input.tsx`**

```tsx
import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
}

export function Input({ label, error, className = '', id, ...props }: FieldProps) {
  const inputId = id ?? props.name

  return (
    <label className="grid gap-2 text-[14px] text-deep-cognac" htmlFor={inputId}>
      <span>{label}</span>
      <input
        id={inputId}
        className={`rounded-xl border border-muted-stone bg-parchment-white px-4 py-3 text-[15px] text-deep-cognac outline-none transition focus:border-burnt-umber focus:ring-2 focus:ring-burnt-umber/10 ${className}`}
        {...props}
      />
      {error ? <span className="text-[13px] text-fire-opal">{error}</span> : null}
    </label>
  )
}

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string
  error?: string
}

export function Textarea({ label, error, className = '', id, ...props }: TextareaProps) {
  const textareaId = id ?? props.name

  return (
    <label className="grid gap-2 text-[14px] text-deep-cognac" htmlFor={textareaId}>
      <span>{label}</span>
      <textarea
        id={textareaId}
        className={`min-h-28 rounded-xl border border-muted-stone bg-parchment-white px-4 py-3 text-[15px] text-deep-cognac outline-none transition focus:border-burnt-umber focus:ring-2 focus:ring-burnt-umber/10 ${className}`}
        {...props}
      />
      {error ? <span className="text-[13px] text-fire-opal">{error}</span> : null}
    </label>
  )
}
```

- [ ] **Step 5: Create `frontend-next/components/ui/card.tsx`**

```tsx
import type { HTMLAttributes } from 'react'

export function Card({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`rounded-2xl border border-cloud-fog bg-parchment-white p-5 soft-shadow ${className}`} {...props} />
}

export function Panel({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return <section className={`rounded-[20px] border border-cloud-fog bg-parchment-white p-5 ${className}`} {...props} />
}
```

- [ ] **Step 6: Create `frontend-next/components/ui/toast.tsx`**

```tsx
type ToastProps = {
  message: string
  tone?: 'success' | 'error' | 'neutral'
}

const tones = {
  success: 'border-pressed-cacao text-deep-cognac',
  error: 'border-fire-opal text-fire-opal',
  neutral: 'border-muted-stone text-deep-cognac',
}

export function Toast({ message, tone = 'neutral' }: ToastProps) {
  return <p className={`rounded-xl border bg-parchment-white px-4 py-3 text-[14px] ${tones[tone]}`}>{message}</p>
}
```

- [ ] **Step 7: Run checks**

Run:

```bash
npm run typecheck --prefix frontend-next
```

Expected: fails only if `next-env.d.ts` has not been generated yet. If so, run `npm run dev --prefix frontend-next` once, stop it after Next.js creates `next-env.d.ts`, then rerun typecheck and expect PASS.

- [ ] **Step 8: Commit styling foundation**

```bash
git add frontend-next/app frontend-next/components frontend-next/next-env.d.ts
git commit -m "Add Delphi design foundation"
```

---

### Task 3: Add typed API and auth helpers

**Files:**
- Create: `frontend-next/lib/types.ts`
- Create: `frontend-next/lib/auth.ts`
- Create: `frontend-next/lib/api.ts`

- [ ] **Step 1: Create `frontend-next/lib/types.ts`**

```ts
export type User = {
  _id: string
  name: string
  email: string
  birthday?: string | null
  phone?: string | null
  address?: string | null
  bio?: string | null
  location?: string | null
  profilePicture?: string | null
}

export type AuthResponse = {
  user: User
  token: string
  message: string
}

export type Event = {
  _id: string
  title: string
  date: string
  location?: string
  notes?: string
  userId?: string
  createdAt?: string
  updatedAt?: string
}

export type EventInput = {
  title: string
  date: string
  location: string
  notes: string
}

export type DashboardData = {
  totalEvents?: number
  upcomingEvents?: number
  pastEvents?: number
  events?: Event[]
  [key: string]: unknown
}

export type WeatherData = {
  location?: string
  temperature?: number
  condition?: string
  description?: string
  [key: string]: unknown
}

export type Holiday = {
  date: string
  name: string
  [key: string]: unknown
}

export type GraphqlSearchResponse = {
  data?: {
    events?: Event[]
    searchEvents?: Event[]
  }
  errors?: Array<{ message: string }>
}
```

- [ ] **Step 2: Create `frontend-next/lib/auth.ts`**

```ts
import type { User } from './types'

const tokenKey = 'acarakita_token'
const userKey = 'acarakita_user'

export function getToken() {
  if (typeof window === 'undefined') return null
  return window.localStorage.getItem(tokenKey)
}

export function getStoredUser(): User | null {
  if (typeof window === 'undefined') return null
  const value = window.localStorage.getItem(userKey)
  if (!value) return null

  try {
    return JSON.parse(value) as User
  } catch {
    return null
  }
}

export function storeSession(token: string, user: User) {
  window.localStorage.setItem(tokenKey, token)
  window.localStorage.setItem(userKey, JSON.stringify(user))
}

export function clearSession() {
  window.localStorage.removeItem(tokenKey)
  window.localStorage.removeItem(userKey)
}
```

- [ ] **Step 3: Create `frontend-next/lib/api.ts`**

```ts
import { getToken } from './auth'
import type { AuthResponse, DashboardData, Event, EventInput, GraphqlSearchResponse, Holiday, User, WeatherData } from './types'

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3333'

type RequestOptions = RequestInit & { authenticated?: boolean }

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const headers = new Headers(options.headers)
  headers.set('Accept', 'application/json')

  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  if (options.authenticated) {
    const token = getToken()
    if (token) headers.set('Authorization', `Bearer ${token}`)
  }

  const response = await fetch(`${apiBaseUrl}${path}`, { ...options, headers })
  const text = await response.text()
  const data = text ? JSON.parse(text) : null

  if (!response.ok) {
    const message = data?.message ?? data?.error ?? 'Request failed'
    throw new Error(message)
  }

  return data as T
}

export const api = {
  login(email: string, password: string) {
    return request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  },
  register(name: string, email: string, password: string, passwordConfirmation: string) {
    return request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, password_confirmation: passwordConfirmation }),
    })
  },
  events() {
    return request<Event[]>('/api/events', { authenticated: true })
  },
  createEvent(input: EventInput) {
    return request<Event>('/api/events', { method: 'POST', authenticated: true, body: JSON.stringify(input) })
  },
  updateEvent(id: string, input: EventInput) {
    return request<Event>(`/api/events/${id}`, { method: 'PUT', authenticated: true, body: JSON.stringify(input) })
  },
  deleteEvent(id: string) {
    return request<{ message: string }>(`/api/events/${id}`, { method: 'DELETE', authenticated: true })
  },
  dashboard() {
    return request<DashboardData>('/api/dashboard', { authenticated: true })
  },
  profile() {
    return request<User>('/api/profile', { authenticated: true })
  },
  updateProfile(input: Partial<User>) {
    return request<User>('/api/profile', { method: 'PUT', authenticated: true, body: JSON.stringify(input) })
  },
  resetPassword(password: string, passwordConfirmation: string) {
    return request<{ message: string }>('/api/profile/reset-password', {
      method: 'POST',
      authenticated: true,
      body: JSON.stringify({ password, password_confirmation: passwordConfirmation }),
    })
  },
  weather(location = 'Palu') {
    return request<WeatherData>(`/api/weather?location=${encodeURIComponent(location)}`, { authenticated: true })
  },
  holidays() {
    return request<Holiday[]>('/api/holidays', { authenticated: true })
  },
  searchEvents(query: string) {
    return request<GraphqlSearchResponse>('/api/graphql', {
      method: 'POST',
      authenticated: true,
      body: JSON.stringify({ query }),
    })
  },
}
```

- [ ] **Step 4: Run typecheck**

```bash
npm run typecheck --prefix frontend-next
```

Expected: PASS.

- [ ] **Step 5: Commit API helpers**

```bash
git add frontend-next/lib
 git commit -m "Add frontend API and auth helpers"
```

---

### Task 4: Build the editorial landing page

**Files:**
- Create: `frontend-next/app/page.tsx`

- [ ] **Step 1: Create `frontend-next/app/page.tsx`**

```tsx
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
```

- [ ] **Step 2: Run typecheck**

```bash
npm run typecheck --prefix frontend-next
```

Expected: PASS.

- [ ] **Step 3: Commit landing page**

```bash
git add frontend-next/app/page.tsx
git commit -m "Add Delphi landing page"
```

---

### Task 5: Build authentication pages

**Files:**
- Create: `frontend-next/components/auth/auth-form.tsx`
- Create: `frontend-next/app/sign-in/page.tsx`
- Create: `frontend-next/app/sign-up/page.tsx`

- [ ] **Step 1: Create `frontend-next/components/auth/auth-form.tsx`**

```tsx
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
```

- [ ] **Step 2: Create sign-in and sign-up pages**

`frontend-next/app/sign-in/page.tsx`:

```tsx
import Link from 'next/link'
import { AuthForm } from '@/components/auth/auth-form'

export default function SignInPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-cloud-fog px-6 py-16 text-deep-cognac">
      <div className="w-full">
        <AuthForm mode="sign-in" />
        <p className="mt-6 text-center text-muted-stone">
          New to AcaraKita? <Link className="text-deep-cognac underline" href="/sign-up">Create an account</Link>
        </p>
      </div>
    </main>
  )
}
```

`frontend-next/app/sign-up/page.tsx`:

```tsx
import Link from 'next/link'
import { AuthForm } from '@/components/auth/auth-form'

export default function SignUpPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-cloud-fog px-6 py-16 text-deep-cognac">
      <div className="w-full">
        <AuthForm mode="sign-up" />
        <p className="mt-6 text-center text-muted-stone">
          Already have an account? <Link className="text-deep-cognac underline" href="/sign-in">Sign in</Link>
        </p>
      </div>
    </main>
  )
}
```

- [ ] **Step 3: Run typecheck**

```bash
npm run typecheck --prefix frontend-next
```

Expected: PASS.

- [ ] **Step 4: Commit auth pages**

```bash
git add frontend-next/components/auth frontend-next/app/sign-in frontend-next/app/sign-up
git commit -m "Add Next.js auth pages"
```

---

### Task 6: Build authenticated app shell and route guard

**Files:**
- Create: `frontend-next/components/app/app-nav.tsx`
- Create: `frontend-next/app/app/layout.tsx`

- [ ] **Step 1: Create `frontend-next/components/app/app-nav.tsx`**

```tsx
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
```

- [ ] **Step 2: Create `frontend-next/app/app/layout.tsx`**

```tsx
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
```

- [ ] **Step 3: Run typecheck**

```bash
npm run typecheck --prefix frontend-next
```

Expected: PASS.

- [ ] **Step 4: Commit app shell**

```bash
git add frontend-next/components/app/app-nav.tsx frontend-next/app/app/layout.tsx
git commit -m "Add authenticated app shell"
```

---

### Task 7: Build dashboard event command center

**Files:**
- Create: `frontend-next/components/app/event-card.tsx`
- Create: `frontend-next/components/app/event-form.tsx`
- Create: `frontend-next/app/app/page.tsx`

- [ ] **Step 1: Create `frontend-next/components/app/event-card.tsx`**

```tsx
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
```

- [ ] **Step 2: Create `frontend-next/components/app/event-form.tsx`**

```tsx
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
```

- [ ] **Step 3: Create `frontend-next/app/app/page.tsx`**

```tsx
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
```

- [ ] **Step 4: Run typecheck**

```bash
npm run typecheck --prefix frontend-next
```

Expected: PASS.

- [ ] **Step 5: Commit dashboard**

```bash
git add frontend-next/components/app/event-card.tsx frontend-next/components/app/event-form.tsx frontend-next/app/app/page.tsx
git commit -m "Add event command center dashboard"
```

---

### Task 8: Build search and profile pages

**Files:**
- Create: `frontend-next/app/app/search/page.tsx`
- Create: `frontend-next/app/app/profile/page.tsx`

- [ ] **Step 1: Create `frontend-next/app/app/search/page.tsx`**

```tsx
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
```

- [ ] **Step 2: Create `frontend-next/app/app/profile/page.tsx`**

```tsx
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
```

- [ ] **Step 3: Run typecheck**

```bash
npm run typecheck --prefix frontend-next
```

Expected: PASS.

- [ ] **Step 4: Commit search and profile**

```bash
git add frontend-next/app/app/search frontend-next/app/app/profile
git commit -m "Add search and profile pages"
```

---

### Task 9: Verify browser behavior and production build

**Files:**
- Modify only files required by failures found during verification.

- [ ] **Step 1: Start backend**

Run in one terminal:

```bash
npm run dev
```

Expected: AdonisJS serves the API on `http://localhost:3333`.

- [ ] **Step 2: Start frontend**

Run in another terminal:

```bash
npm run dev --prefix frontend-next
```

Expected: Next.js serves the frontend, usually on `http://localhost:3000`.

- [ ] **Step 3: Manually verify public pages**

Open the frontend URL and verify:

- `/` shows Delphi parchment landing page.
- Header sign-in link opens `/sign-in`.
- Landing primary CTA opens `/sign-up`.
- Mobile viewport keeps hero and cards readable.

- [ ] **Step 4: Manually verify auth and protected routing**

Verify:

- Visiting `/app` without token redirects to `/sign-in`.
- `/sign-up` registers a new user against `/auth/register`.
- `/sign-in` logs in against `/auth/login`.
- Successful auth redirects to `/app`.
- Sign out clears session and returns to `/sign-in`.

- [ ] **Step 5: Manually verify dashboard CRUD**

Verify:

- Dashboard loads existing events from `/api/events`.
- New Event opens the form.
- Creating an event adds it to the grid after reload.
- Editing an event updates the card.
- Deleting an event removes it from the grid.
- Weather, holiday, and stats panels show available API data or calm empty text.

- [ ] **Step 6: Manually verify search and profile**

Verify:

- `/app/search` submits a GraphQL search to `/api/graphql` and displays matching cards.
- `/app/profile` loads current user data from `/api/profile`.
- Saving profile updates API data and shows a success message.
- Password update submits to `/api/profile/reset-password` and shows a success message.

- [ ] **Step 7: Run final checks**

```bash
npm run typecheck --prefix frontend-next
npm run build --prefix frontend-next
npm run typecheck
```

Expected: all commands PASS. If `npm run typecheck` in the root repo fails because of pre-existing backend issues, capture the exact errors and do not claim backend verification passed.

- [ ] **Step 8: Commit verification fixes**

If verification required code changes:

```bash
git add frontend-next
git commit -m "Fix Next.js rebrand verification issues"
```

If no changes were required, do not create an empty commit.

---

## Self-Review

Spec coverage:

- Separate `frontend-next/` app is covered by Task 1.
- Delphi design tokens and Source Serif/Inter typography are covered by Task 2.
- Landing page editorial direction is covered by Task 4.
- Modern routes are covered by Tasks 4, 5, 6, 7, and 8.
- Auth session and protected redirects are covered by Tasks 3, 5, and 6.
- Two-column command center dashboard is covered by Task 7.
- Event CRUD is covered by Task 7 and verified in Task 9.
- GraphQL search is covered by Task 8 and verified in Task 9.
- Profile/account settings are covered by Task 8 and verified in Task 9.
- Manual browser and build verification are covered by Task 9.

Placeholder scan: no TBD/TODO/fill-in-later steps remain. Each code-writing step includes exact file content.

Type consistency: shared `User`, `Event`, `EventInput`, and API method names are defined in Task 3 before being used by later tasks.
