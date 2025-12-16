import vine from '@vinejs/vine'

export const registerUserValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(2),
    email: vine.string().email(),
    password: vine.string().minLength(8).confirmed(),
    birthday: vine.date().optional(),
    phone: vine.string().minLength(10).maxLength(15).optional(),
    address: vine.string().maxLength(500).optional(),
  })
)