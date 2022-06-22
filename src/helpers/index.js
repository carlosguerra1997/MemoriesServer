import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

export const jwtSign = (id, email) => {
  const token = jwt.sign(
    { id, email }, 
    process.env.JWT_SECRET, 
    { expiresIn: '1h' }
  )
  return token
}