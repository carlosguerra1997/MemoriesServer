import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({
  name: { type: String, required: true  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { versionKey: false })

UserSchema.statics.findByUserId = async function(id) {
  const creator = await this.find({ _id: mongoose.Types.ObjectId(id) })
  return creator[0].name
}

const User = mongoose.model('User', UserSchema)

export default User
