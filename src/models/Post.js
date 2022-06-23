import mongoose from 'mongoose'

const PostSchema = mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  creator: { type: String, required: true },
  tags: { type: [String] },
  file: { type: String },
  likes: { type: [String], default: [] },
  createdAt: { type: Date, default: new Date() }
}, { versionKey: false })

const Post = mongoose.model('Post', PostSchema)

export default Post
