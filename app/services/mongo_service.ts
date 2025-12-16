import mongoose from 'mongoose'
import env from '#start/env'

export async function connectToDB() {
  try {
    await mongoose.connect(env.get('MONGO_URI')!)
    console.log('Tersambung ke MongoDB')
  } catch (error) {
    console.error('Gagal tersambung ke MongoDB:', error)
    process.exit(1)
  }
}