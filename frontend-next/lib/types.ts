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
