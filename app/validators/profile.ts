import vine from '@vinejs/vine'

export const updateProfileValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(2).optional(),
    birthday: vine.date().optional(),
    phone: vine.string().minLength(10).maxLength(15).optional(),
    address: vine.string().maxLength(500).optional(),
  })
)

export const resetPasswordValidator = vine.compile(
  vine.object({
    currentPassword: vine.string().minLength(1),
    newPassword: vine.string().minLength(8).confirmed(),
  })
)
