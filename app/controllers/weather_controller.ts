import type { HttpContext } from '@adonisjs/core/http'
import env from '#start/env'

export default class WeatherController {
  async getForDate({ request, response }: HttpContext) {
    const apiKey = env.get('WEATHER_API_KEY')
    if (!apiKey) {
      return response.internalServerError({ message: 'Weather API key not configured' })
    }

    const city = request.input('city', 'Palu')
    const dateStr = request.input('date')

    if (!dateStr) {
      return response.badRequest({ message: 'Tanggal diperlukan' })
    }

    const eventDate = new Date(dateStr)
    const today = new Date()

    const diffTime = eventDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    let apiUrl = ''

    if (diffDays <= 14) {
      apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&dt=${dateStr}`
    } else {
      apiUrl = `https://api.weatherapi.com/v1/future.json?key=${apiKey}&q=${city}&dt=${dateStr}`
    }

    try {
      const res = await fetch(apiUrl)

      if (!res.ok) {
        const errorData = await res.json()
        return response.status(res.status).json({
          message: 'Failed to fetch weather data',
          error: errorData.error?.message,
        })
      }

      const data = await res.json()

      const forecastDay = data.forecast.forecastday[0]
      const result = {
        temp_c: forecastDay.day.avgtemp_c,
        condition: {
          text: forecastDay.day.condition.text,
          icon: forecastDay.day.condition.icon,
        },
        date: dateStr,
        hourly: forecastDay.hour,
      }

      return response.json(result)
    } catch (error) {
      console.error('Weather Controller Error:', error)
      return response.internalServerError({ message: 'Internal server error fetching weather' })
    }
  }

  async current({ request, response }: HttpContext) {
    const apiKey = env.get('WEATHER_API_KEY')
    if (!apiKey) {
      return response.internalServerError({ message: 'Weather API key not configured' })
    }

    const city = request.input('city', 'Palu')
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`

    try {
      const res = await fetch(apiUrl)

      if (!res.ok) {
        const errorData = await res.json()
        return response.status(res.status).json({
          message: 'Failed to fetch current weather',
          error: errorData.error?.message,
        })
      }

      const data = await res.json()

      const result = {
        temp_c: data.current.temp_c,
        condition: {
          text: data.current.condition.text,
          icon: data.current.condition.icon,
        },
        humidity: data.current.humidity,
        wind_kph: data.current.wind_kph,
        city: data.location.name,
        local_time: data.location.localtime,
      }

      return response.json(result)
    } catch (error) {
      console.error('Weather Controller Error:', error)
      return response.internalServerError({ message: 'Internal server error' })
    }
  }
}
