import type { HttpContext } from '@adonisjs/core/http'
import SavedEvent from '#models/event'

export default class DashboardController {
  public async dashboard({ request, response }: HttpContext) {
    try {
      const user = (request as any).user
      const waktuSekarang = new Date()
      const wita = 8 * 60 * 60 * 1000
      const waktuWitaSekarang = new Date(waktuSekarang.getTime() + wita)

      const awalHari = new Date(
        waktuWitaSekarang.getFullYear(),
        waktuWitaSekarang.getMonth(),
        waktuWitaSekarang.getDate()
      )
      awalHari.setTime(awalHari.getTime() - wita)

      const akhirHari = new Date(
        waktuWitaSekarang.getFullYear(),
        waktuWitaSekarang.getMonth(),
        waktuWitaSekarang.getDate() + 1
      )
      akhirHari.setTime(akhirHari.getTime() - wita)

      const akhirMinggu = new Date(waktuSekarang)
      akhirMinggu.setDate(waktuSekarang.getDate() + (7 - waktuSekarang.getDay()))

      const [eventSelanjutnya, eventHariIni, eventMingguIni, totalEvent] = await Promise.all([
        SavedEvent.findOne({ userId: user.userId, date: { $gte: waktuSekarang } }).sort({
          date: 1,
        }),
        SavedEvent.countDocuments({
          userId: user.userId,
          date: { $gte: awalHari, $lt: akhirHari },
        }),
        SavedEvent.countDocuments({
          userId: user.userId,
          date: { $gte: waktuSekarang, $lt: akhirMinggu },
        }),
        SavedEvent.countDocuments({ userId: user.userId }),
      ])

      return response.status(200).json({
        data: {
          upcoming_event: eventSelanjutnya
            ? {
                title: eventSelanjutnya.title,
                date: eventSelanjutnya.date,
                description: eventSelanjutnya.notes,
              }
            : null,
          events_today: eventHariIni,
          events_this_week: eventMingguIni,
          total_events: totalEvent,
        },
        message: 'Dashboard ditampilkan',
      })
    } catch (error) {
      return response.status(500).json({
        message: error.message || 'Gagal mengambil data dashboard',
      })
    }
  }
}
