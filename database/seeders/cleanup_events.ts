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
    await mongoose.connect('mongodb+srv://farizzi79_db_user:10mFcWQyRouQ74Zt@database-event.ih6wclg.mongodb.net/?retryWrites=true&w=majority&appName=database-event')
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