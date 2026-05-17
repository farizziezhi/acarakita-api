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
