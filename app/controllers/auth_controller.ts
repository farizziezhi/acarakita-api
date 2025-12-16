import User from '#models/user'
import { registerUserValidator } from '#validators/register_user'
import hash from '@adonisjs/core/services/hash'
import { buatToken } from '#services/jwt_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  public async register({ request, response }: HttpContext) {
    try {
      const validateData = await request.validateUsing(registerUserValidator)

      const cekUser = await User.findOne({ email: validateData.email })
      if (cekUser) {
        return response.status(400).json({
          message: 'Email sudah digunakan',
        })
      }

      const user = await User.create(validateData)
      const token = buatToken({ userId: user._id, email: user.email })

      return response.status(201).json({
        user,
        token,
        message: 'Registrasi berhasil',
      })
    } catch (error) {
      return response.status(500).json({
        message: error.message || 'Registrasi Gagal',
      })
    }
  }

  public async login({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.findOne({ email })
    if (!user || !(await hash.verify(user.password, password))) {
      return response.status(401).json({
        message: 'Email atau Password salah',
      })
    }

    const token = buatToken({ userId: user._id, email: user.email })

    return response.status(200).json({
      user,
      token,
      message: 'Login berhasil',
    })
  }
}
