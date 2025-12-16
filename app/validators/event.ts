import vine from '@vinejs/vine'

export const eventValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(3).maxLength(255),
    date: vine.string(),
    place: vine.string().trim().maxLength(255).optional(),
    notes: vine.string().trim().maxLength(1000).optional(),
  })
)
