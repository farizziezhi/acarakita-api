import type { HttpContext } from '@adonisjs/core/http'
import env from '#start/env'

export default class SerpController {
  async getRecommendations({ response }: HttpContext) {
    const apiKey = env.get('SERP_API_KEY')
    if (!apiKey) {
      return response.internalServerError({ message: 'SerpAPI key not configured' })
    }

    const query = 'Event Indonesia'
    const apiUrl = `https://serpapi.com/search.json?engine=google_events&q=${encodeURIComponent(query)}&api_key=${apiKey}`

    try {
      console.log('Fetching SerpAPI:', apiUrl)
      const res = await fetch(apiUrl)

      if (!res.ok) {
        const errorData = await res.json()
        console.error('SerpAPI Error:', errorData)
        return response.status(res.status).json({
          message: 'Failed to fetch recommendations',
          error: errorData.error,
        })
      }

      const data = await res.json()
      const allEvents = data.events_results || []
      console.log('Total events found:', allEvents.length)

      const today = new Date()
      const currentMonth = today.toLocaleString('en-US', { month: 'short' })
      const currentDay = today.getDate()
      const todayString = `${currentMonth} ${currentDay}`

      const upcomingEvents = allEvents.filter((event: any) => {
        const when = event.date?.when || ''
        const startDate = event.date?.start_date || ''

        const isTodayString =
          when.toLowerCase().includes('today') || when.toLowerCase().includes('hari ini')

        const isTodayDate = startDate.includes(todayString)

        return !isTodayString && !isTodayDate
      })

      console.log('Events after filtering today:', upcomingEvents.length)
      const events = upcomingEvents.slice(0, 6)

      return response.json(events)
    } catch (error) {
      console.error('SerpController Error:', error)
      return response.internalServerError({
        message: 'Internal server error',
      })
    }
  }
}
