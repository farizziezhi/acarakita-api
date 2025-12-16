import mongoose from 'mongoose'
import { Schema, model } from 'mongoose'

const EventSchema = new Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  place: { type: String },
  notes: { type: String },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
})

const SavedEvent = model('SavedEvent', EventSchema)

async function cleanupEvents() {
  try {
    console.log('🧹 Starting cleanup...')

    // Connect to MongoDB
    const mongoUrl = process.env.MONGO_URL
    if (!mongoUrl) {
      throw new Error('MONGO_URL not found in environment variables')
    }
    await mongoose.connect(mongoUrl)
    console.log('✅ Connected to MongoDB')

    // Delete all events
    const result = await SavedEvent.deleteMany({})

    console.log(`✅ Deleted ${result.deletedCount} events`)

    await mongoose.disconnect()
    process.exit(0)
  } catch (error) {
    console.error('❌ Cleanup error:', error)
    process.exit(1)
  }
}

cleanupEvents()
