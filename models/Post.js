import mongoose from 'mongoose'

const PostSchema = mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  creator: { type: String, required: true },
  tags: { type: [String] },
  file: { type: String },
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now() }
})

const Post = mongoose.model('Message', PostSchema)

export default Post
