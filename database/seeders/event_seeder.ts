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

async function seedEvents() {
  try {
    console.log('🌱 Starting events seeder...')

    // Connect to MongoDB
    const mongoUrl = process.env.MONGO_URL
    if (!mongoUrl) {
      throw new Error('MONGO_URL not found in environment variables')
    }
    await mongoose.connect(mongoUrl)
    console.log('✅ Connected to MongoDB')

    // Your existing user IDs converted to ObjectId
    const userIds = [
      new mongoose.Types.ObjectId('68ef239da753980278891d9b'), // mail@mail.com
      new mongoose.Types.ObjectId('68ef251aa753980278891d9f'), // user@mail.com
      new mongoose.Types.ObjectId('68ef259da753980278891da3'), // user123@mail.com
      new mongoose.Types.ObjectId('68ef265aa753980278891da7'), // user1234@mail.com
      new mongoose.Types.ObjectId('68ef26ada753980278891daa'), // user12@mail.com
    ]

    const eventsData = []

    // Create 30 events for first user (for pagination testing)
    for (let i = 1; i <= 30; i++) {
      eventsData.push({
        title: `Event ${i}`,
        date: new Date(2024, 11, (i % 31) + 1), // December 2024
        place: `Location ${i}`,
        notes: `Notes for event ${i}`,
        userId: userIds[0],
      })
    }

    // Create 10 events for second user
    for (let i = 1; i <= 10; i++) {
      eventsData.push({
        title: `Meeting ${i}`,
        date: new Date(2025, 0, i), // January 2025
        place: `Office ${i}`,
        notes: `Meeting notes ${i}`,
        userId: userIds[1],
      })
    }

    // Create 5 events for third user
    for (let i = 1; i <= 5; i++) {
      eventsData.push({
        title: `Conference ${i}`,
        date: new Date(2025, 1, i), // February 2025
        place: `Hall ${i}`,
        notes: `Conference notes ${i}`,
        userId: userIds[2],
      })
    }

    await SavedEvent.create(eventsData)

    console.log('✅ Created 45 test events')
    console.log('📧 Events distributed:')
    console.log('  - mail@mail.com: 30 events')
    console.log('  - user@mail.com: 10 events')
    console.log('  - user123@mail.com: 5 events')
    console.log('🔍 Test pagination with mail@mail.com (30 events)')

    await mongoose.disconnect()
    process.exit(0)
  } catch (error) {
    console.error('❌ Seeder error:', error)
    process.exit(1)
  }
}

seedEvents()
