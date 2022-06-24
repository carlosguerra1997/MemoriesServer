import mongoose from 'mongoose'

const PostSchema = mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tags: { type: [String] },
  file: { type: String },
  likes: { type: [String], default: [] },
  createdAt: { type: Date, default: new Date().toISOString() }
}, { versionKey: false })

const Post = mongoose.model('Post', PostSchema)

export default Post
