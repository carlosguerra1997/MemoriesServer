import bcrypt from 'bcryptjs'

import User from '../models/User.js'

import { jwtSign } from '../helpers/index.js'

export const signIn = async (req, res) => {
  const { email, password } = req.body
  try {
    const userExists = await User.findOne({ email })
    if (!userExists) return res.status(404).json({ ok: false, message: 'Las credenciales no son correctas' })

    const isPasswordCorrect = bcrypt.compare(password, userExists.password)
    if (!isPasswordCorrect) return res.status(400).json({ ok: false, message: 'Las credenciales no son correctas' })
    
    const token = jwtSign({ id: userExists._id, email: userExists.email })
    res.status(200).json({ ok: true, token })
  } catch (error) {
    res.status(500).send({ ok: false, message: error })
  }
}

export const signUp = async (req, res) => {
  try {
    
  } catch (error) {
    res.status(400).send({ ok: false, message: error })
  }
}

