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
