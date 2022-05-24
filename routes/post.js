import express from 'express'

import { createPost, getPosts } from '../controllers/Message.js'

const router = express.Router()

router.post('/', createPost)
router.get('/', getPosts)

export default router
