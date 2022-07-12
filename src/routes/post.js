import express from 'express'

import { auth } from '../middlewares/auth.js'

import { createPost, deletePost, likePost, getPosts, getRecommendedPosts, getPostsBySearch, updatePost } from '../controllers/Message.js'

const router = express.Router()

router.post('/', auth, createPost)
router.get('/', getPosts)
router.get('/:id', getRecommendedPosts)
router.get('/search', getPostsBySearch)
router.put('/:id', auth, updatePost)
router.put('/:id/like', auth, likePost)
router.delete('/:id', auth, deletePost)

export default router
