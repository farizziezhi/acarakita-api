import jwt from 'jsonwebtoken'
import env from '#start/env'

const token_jwt = env.get('JWT_SECRET', 'your-secret-key')

export function buatToken(payload: object): string {
  return jwt.sign(payload, token_jwt, { expiresIn: '7d' })
}

export function cekToken(token: string): any {
  return jwt.verify(token, token_jwt)
}