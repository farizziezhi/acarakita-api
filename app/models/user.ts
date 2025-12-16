import hash from '@adonisjs/core/services/hash'
import mongoose, { Schema, model } from 'mongoose'

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  birthday: { type: Date },
  phone: { type: String },
  address: { type: String },
})

UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await hash.make(this.password)
  }
  next()
})

const User = mongoose.models.User || model('User', UserSchema)
export default User
