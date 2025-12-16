import type { HttpContext } from '@adonisjs/core/http'

export default class HolidaysController {
  async get({ request, response }: HttpContext) {
    const year = request.input('year', new Date().getFullYear())
    const month = parseInt(request.input('month', new Date().getMonth() + 1))
    const country = request.input('country', 'ID')

    const apiUrl = `https://date.nager.at/api/v3/publicholidays/${year}/${country}`

    try {
      const res = await fetch(apiUrl)

      if (!res.ok) {
        if (res.status === 404) return response.json([])

        return response.status(res.status).json({
          message: 'Failed to fetch holidays',
        })
      }

      const allHolidays = await res.json()

      const monthlyHolidays = allHolidays.filter((h: any) => {
        const hDate = new Date(h.date)
        return hDate.getMonth() + 1 === month
      })

      return response.json(monthlyHolidays)
    } catch (error) {
      console.error('Holidays Controller Error:', error)
      return response.internalServerError({ message: 'Internal server error' })
    }
  }
}
