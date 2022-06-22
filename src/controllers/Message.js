import Post from '../models/Post.js'

export const createPost = async (req, res) => {
  const post = new Post(req.body)
  try {
    await post.save()
    res.status(200).json(post)
  } catch (error) {
    res.status(404).send(error)
  }
}

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
    res.status(200).json(posts)
  } catch (error) {
    res.status(404).send(error)
  }
}

export const updatePost = async (req, res) => {
  const { id } = req.params
  const { post } = req.body
  try {
    const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true })
    res.status(200).json(updatedPost)
  } catch (error) {
    res.status(404).send(error)
  }
}

export const likePost = async (req, res) => {
  const { id } = req.params
  try {
    const post = await Post.findById(id)
    const updatedPostLikes = await Post.findByIdAndUpdate(id, { likes: post.likes + 1 }, { new: true })
    return res.status(200).json(updatedPostLikes)
  } catch (error) {
    res.status(404).send(error)
  }
}

export const deletePost = async (req, res) => {
  const { id } = req.params
  try {
    await Post.findByIdAndDelete(id)
    res.status(200).json({ ok: true, message: 'Post borrado con éxito' })
  } catch (error) {
    res.status(404).send(error)
  }
}

