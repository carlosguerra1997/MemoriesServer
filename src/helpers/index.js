import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

export const jwtSign = (id, email, name) => {
  const token = jwt.sign({ id, email, name }, process.env.JWT_SECRET, { expiresIn: '30d' })
  return token
}