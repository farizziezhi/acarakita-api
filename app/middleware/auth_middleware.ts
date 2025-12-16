import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { cekToken } from '#services/jwt_service'

export default class AuthMiddleware {
  public async handle(ctx: HttpContext, next: NextFn) {
    const { request, response } = ctx
    const token = request.header('authorization')?.replace('Bearer ', '')
    if (!token) return response.status(401).json({ message: 'Token diperlukan' })

    try {
      const payload = cekToken(token)
      ;(request as any).user = payload
      return await next()
    } catch (error) {
      return response.status(401).json({ message: 'Token Salah' })
    }
  }
}
