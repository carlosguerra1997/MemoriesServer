import mongoose from 'mongoose'

import Post from '../models/Post.js'
import User from '../models/User.js'

import { LIMIT_POSTS_PER_PAGE } from '../constants/index.js'

export const createPost = async (req, res) => {
  const post = new Post({ ...req.body, creator: mongoose.Types.ObjectId(req.userId) })
  try {
    const creator = await User.findByUserId(req.userId)
    await post.save()
    return res.status(200).json({ post, name: creator.name })
  } catch (error) {
    return res.status(404).json(error)
  }
}

export const getPosts = async (req, res) => {
  const { page } = req.query
  const startIndex = (Number(page) -1) * LIMIT_POSTS_PER_PAGE
  const allPosts = []
  try {
    const totalDocs = await Post.countDocuments({})
    const posts = await Post.find().sort({ _id: -1 }).limit(LIMIT_POSTS_PER_PAGE).skip(startIndex)
    for (const post of posts) {
      const creatorName = await User.findByUserId(post.creator)
      const newPost = { post, creatorName }
      allPosts.push(newPost)
    }
    return res.status(200).json({ allPosts, currentPage: Number(page), numberOfPages: Math.ceil(totalDocs / LIMIT_POSTS_PER_PAGE) })
  } catch (error) {
    return res.status(404).json(error)
  }
}

export const getRecommendedPosts = async (req, res) => {
  const { id } = req.params
  const allPosts = []
  try {
    const postFound = await Post.findByPostId(id)
    const { tags } = postFound[0]
    const posts = await Post.find({ tags: { $in: tags.join(' ').split(' ') } })
    for (const post of posts) {
      const creatorName = await User.findByUserId(post.creator)
      const newPost = { post, creatorName }
      allPosts.push(newPost)
    }
    return res.status(200).json(allPosts)
  } catch (error) {
    throw new Error(error)
  }
}

export const getPostsBySearch = async (req, res) => {
  const { searchQuery } = req.query
  const allPosts = []
  try {
    const title = new RegExp(searchQuery, 'i')
    const posts = await Post.find({ title })
    for (const post of posts) {
      const creatorName = await User.findByUserId(post.creator)
      const newPost = { post, creatorName }
      allPosts.push(newPost)
    }
    return res.status(200).json(allPosts)
  } catch (error) {
    return res.status(404).json(error)
  }
}

export const updatePost = async (req, res) => {
  const { id } = req.params
  const { post } = req.body
  try {
    const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true })
    return res.status(200).json(updatedPost)
  } catch (error) {
    return res.status(404).json(error)
  }
}

export const likePost = async (req, res) => {
  const { id } = req.params
  try {
    if (!req.userId) return res.status(400).json({ ok: false, message: 'Inicia sesión para hacer esta acción' })
    const post = await Post.findById(id)
    
    const isLikedByUser = post.likes.find(idUser => idUser === String(req.userId.id))
    if (isLikedByUser) {
      const likes = post.likes.filter(idUser =>  idUser !== isLikedByUser)
      post.likes = likes
    }
    else post.likes.push(req.userId.id)
      
    const updatedPostLikes = await Post.findByIdAndUpdate(id, post, { new: true })
    const creatorName = await User.findByUserId(post.creator)
    return res.status(200).json({ updatedPostLikes, name: creatorName })
  } catch (error) {
    return res.status(404).json(error)
  }
}

export const deletePost = async (req, res) => {
  const { id } = req.params
  try {
    await Post.findByIdAndDelete(id)
    res.status(200).json({ ok: true, message: 'Post borrado con éxito' })
  } catch (error) {
    res.status(404).json(error)
  }
}

