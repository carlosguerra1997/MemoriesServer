import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../models/User.js'

export const signIn = async (req, res) => {
  const { email, password } = req.body
  try {
    const userExists = await User.findOne({ email })
    if (!userExists) return res.status(404).json({ ok: false, message: 'Las credenciales no son correctas' })
    const isPasswordCorrect = bcrypt.compare(password, userExists.password)
    if (!isPasswordCorrect) return res.status(400).json({ ok: false, message: 'Las credenciales no son correctas' })
  } catch (error) {
    res.status(400).send({ ok: false, msg: error })
  }
}

export const signUp = async (req, res) => {
  try {
    
  } catch (error) {
    res.status(400).send({ ok: false, msg: error })
  }
}

