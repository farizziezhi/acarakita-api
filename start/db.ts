import { connectToDB } from '#services/mongo_service'

;(async () => {
  await connectToDB()
})()