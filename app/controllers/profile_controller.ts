import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'
import { updateProfileValidator, resetPasswordValidator } from '#validators/profile'

export default class ProfileController {
  private format(profile: any) {
    return {
      _id: profile._id,
      name: profile.name || '',
      email: profile.email,
      birthday: profile.birthday || null,
      phone: profile.phone || '',
      address: profile.address || '',
    }
  }

  public async show({ request, response }: HttpContext) {
    try {
      const user = (request as any).user
      const profile = await User.findById(user.userId).select('-password')

      if (!profile) {
        return response.status(404).json({
          message: 'Profile tidak ada',
        })
      }

      return response.status(200).json({
        data: this.format(profile),
        message: 'Berhasil',
      })
    } catch (error) {
      return response.status(500).json({
        message: error.message || 'Gagal mengambil profile',
      })
    }
  }

  public async update({ request, response }: HttpContext) {
    const validateData = await request.validateUsing(updateProfileValidator)

    try {
      const user = (request as any).user
      const profile = await User.findByIdAndUpdate(user.userId, validateData, {
        new: true,
      }).select('-password')

      if (!profile) {
        return response.status(404).json({
          message: 'Profile tidak ada',
        })
      }

      return response.status(200).json({
        data: this.format(profile),
        message: 'Berhasil',
      })
    } catch (error) {
      return response.status(500).json({
        message: error.message || 'Gagal memperbarui profile',
      })
    }
  }

  public async resetPassword({ request, response }: HttpContext) {
    const validateData = await request.validateUsing(resetPasswordValidator)

    try {
      const user = (request as any).user
      const profile = await User.findById(user.userId)

      if (!profile) {
        return response.status(404).json({
          message: 'User tidak ditemukan',
        })
      }

      const passwordValid = await hash.verify(profile.password, validateData.currentPassword)
      if (!passwordValid) {
        return response.status(400).json({
          message: 'Password saat ini salah',
        })
      }

      profile.password = validateData.newPassword
      await profile.save()

      return response.status(200).json({
        message: 'Password berhasil diubah',
      })
    } catch (error) {
      return response.status(500).json({
        message: error.message || 'Gagal mengubah password',
      })
    }
  }

  public async deleteAccount({ request, response }: HttpContext) {
    try {
      const user = (request as any).user
      const profile = await User.findByIdAndDelete(user.userId)

      if (!profile) {
        return response.status(404).json({
          message: 'User tidak ditemukan',
        })
      }

      return response.status(200).json({
        message: 'Akun berhasil dihapus',
      })
    } catch (error) {
      return response.status(500).json({
        message: error.message || 'Gagal menghapus akun',
      })
    }
  }
}
