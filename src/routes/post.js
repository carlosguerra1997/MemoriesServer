import express from 'express'

import { createPost, deletePost, likePost, getPosts, updatePost } from '../controllers/Message.js'

const router = express.Router()

router.post('/', createPost)
router.get('/', getPosts)
router.put('/:id', updatePost)
router.put('/:id/like', likePost)
router.delete('/:id', deletePost)

export default router
