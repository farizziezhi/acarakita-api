import mongoose, { Schema, model } from 'mongoose'

const SavedEventSchema = new Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  place: { type: String },
  notes: { type: String },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
})

const SavedEvent = mongoose.models.SavedEvent || model('SavedEvent', SavedEventSchema)
export default SavedEvent
