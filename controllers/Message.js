import Post from '../models/Post.js'

export const createPost = async (req, res) => {
  const post = new Post(req.body)
  try {
    await post.save()
    res.status(200).json(post)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
    res.status(200).json(posts)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
