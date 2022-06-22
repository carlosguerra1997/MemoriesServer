import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'

import connectDB from './src/config/db.js'
import postsRouter from './src/routes/post.js'
import authRouter from './src/routes/auth.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4050

connectDB()

app.use(cors())
app.use(express.json({ limit: '10MB' }))

app.use('/api/posts', postsRouter)
app.use('/api/auth', authRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
