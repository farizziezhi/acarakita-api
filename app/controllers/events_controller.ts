import { eventValidator } from '#validators/event'
import SavedEvent from '#models/event'
import type { HttpContext } from '@adonisjs/core/http'

export default class EventsController {
  public async index({ request, response }: HttpContext) {
    try {
      const user = (request as any).user
      const events = await SavedEvent.find({ userId: user.userId }).sort({ date: 1 })

      return response.status(200).json({
        data: events,
        message: 'Event ditemukan',
      })
    } catch (error) {
      return response.status(500).json({
        message: error.message || 'Gagal mengambil event',
      })
    }
  }

  public async show({ request, response, params }: HttpContext) {
    try {
      const user = (request as any).user
      const event = await SavedEvent.findOne({ _id: params.id, userId: user.userId })

      if (!event) {
        return response.status(404).json({
          message: 'Event tidak ada',
        })
      }

      return response.status(200).json({
        data: event,
        message: 'Event ditemukan',
      })
    } catch (error) {
      return response.status(500).json({
        message: error.message || 'Gagal mengambil event',
      })
    }
  }

  public async store({ request, response }: HttpContext) {
    const validateData = await request.validateUsing(eventValidator)

    try {
      const user = (request as any).user
      const eventData = {
        ...validateData,
        date: new Date(validateData.date + '+08:00'),
        userId: user.userId,
      }

      const event = await SavedEvent.create(eventData)

      return response.status(201).json({
        data: event,
        message: 'Event berhasil dibuat',
      })
    } catch (error) {
      return response.status(500).json({
        message: error.message || 'Gagal membuat event',
      })
    }
  }

  public async update({ request, response, params }: HttpContext) {
    const validateData = await request.validateUsing(eventValidator)

    try {
      const user = (request as any).user
      const updateData = {
        ...validateData,
        date: new Date(validateData.date + '+08:00'),
      }

      const event = await SavedEvent.findOneAndUpdate(
        { _id: params.id, userId: user.userId },
        updateData,
        { new: true }
      )

      if (!event) {
        return response.status(404).json({
          message: 'Event tidak ditemukan',
        })
      }

      return response.status(200).json({
        data: event,
        message: 'Event berhasil diperbarui',
      })
    } catch (error) {
      return response.status(500).json({
        message: error.message || 'Gagal memperbarui event',
      })
    }
  }

  public async destroy({ request, response, params }: HttpContext) {
    try {
      const user = (request as any).user
      const event = await SavedEvent.findOneAndDelete({ _id: params.id, userId: user.userId })

      if (!event) {
        return response.status(404).json({
          message: 'Event tidak ditemukan',
        })
      }

      return response.status(200).json({
        message: 'Event berhasil dihapus',
      })
    } catch (error) {
      return response.status(500).json({
        message: error.message || 'Gagal menghapus event',
      })
    }
  }
}
