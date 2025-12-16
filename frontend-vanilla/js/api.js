const API_BASE = 'http://localhost:3333'

async function fetchAPI(url, options = {}) {
  const token = localStorage.getItem('token')
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(API_BASE + url, {
    ...options,
    headers,
  })

  if (!response.ok) {
    if (response.status === 401 && token) {
      localStorage.removeItem('token')
      window.location.href = 'login.html'
      return
    }

    let pesanError = 'Kesalahan tidak diketahui'
    try {
      const dataError = await response.json()
      pesanError = dataError.message || pesanError
    } catch (e) {
      pesanError = response.statusText || pesanError
    }

    throw new Error(pesanError)
  }

  const data = await response.json()

  return data
}

const authAPI = {
  login: (email, password) =>
    fetchAPI('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  register: (name, email, password, password_confirmation) =>
    fetchAPI('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, password_confirmation }),
    }),
}

const eventsAPI = {
  getAll: () => fetchAPI('/api/events'),

  getById: (id) => fetchAPI(`/api/events/${id}`),

  create: (eventData) =>
    fetchAPI('/api/events', {
      method: 'POST',
      body: JSON.stringify(eventData),
    }),

  update: (id, eventData) =>
    fetchAPI(`/api/events/${id}`, {
      method: 'PUT',
      body: JSON.stringify(eventData),
    }),

  delete: (id) =>
    fetchAPI(`/api/events/${id}`, {
      method: 'DELETE',
    }),
}

const dashboardAPI = {
  getStats: () => fetchAPI('/api/dashboard'),
}

const profileAPI = {
  getProfile: () => fetchAPI('/api/profile'),

  updateProfile: (profileData) =>
    fetchAPI('/api/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    }),

  resetPassword: (currentPassword, newPassword, newPassword_confirmation) =>
    fetchAPI('/api/profile/reset-password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword, newPassword_confirmation }),
    }),

  deleteAccount: () =>
    fetchAPI('/api/profile', {
      method: 'DELETE',
    }),
}

const graphqlAPI = {
  query: (query, variables) =>
    fetchAPI('/api/graphql', {
      method: 'POST',
      body: JSON.stringify({ query, variables }),
    }),
}

const weatherAPI = {
  getForDate: (city, date) =>
    fetchAPI(`/api/weather?city=${encodeURIComponent(city)}&date=${date}`),
  getCurrent: (city) => fetchAPI(`/api/weather/current?city=${encodeURIComponent(city)}`),
}

const holidaysAPI = {
  get: (year, month, country = 'ID') =>
    fetchAPI(`/api/holidays?year=${year}&month=${month}&country=${country}`),
}

const serpAPI = {
  getRecommendations: () => fetchAPI('/api/recommendations'),
}

// function requireAuth() {
//   const token = localStorage.getItem('token')
//   if (!token) {
//     window.location.href = 'login.html'
//   }
// }

// function requireGuest() {
//   const token = localStorage.getItem('token')
//   if (token) {
//     window.location.href = 'dashboard.html'
//   }
// }
