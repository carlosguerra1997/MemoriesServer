import bcrypt from 'bcryptjs'

import User from '../models/User.js'

import { jwtSign } from '../helpers/index.js'
import { auth } from '../constants/index.js'

export const signIn = async (req, res) => {
  const { email, password } = req.body
  try {
    const userExists = await User.findOne({ email })
    if (!userExists) return res.status(400).json({ ok: false, message: auth.invalidCredentials })

    const isPasswordCorrect = await bcrypt.compare(password, userExists.password)
    if (!isPasswordCorrect) return res.status(400).json({ ok: false, message: auth.invalidCredentials })
    
    const token = jwtSign({ id: userExists._id, email: userExists.email, name: userExists.name })
    const userInfo = { id: userExists.id, name: userExists.name }
    return res.status(200).json({ userInfo, token })
  } catch (error) {
    return res.status(500).json({ ok: false, message: error })
  }
}

export const signUp = async (req, res) => {
  const { email, firstName, lastName, password } = req.body
  try {
    const userExists = await User.findOne({ email })
    if (userExists) return res.status(400).json({ ok: false, message: auth.userExists })

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = await User.create({ name: `${firstName} ${lastName}`, email, password: hashedPassword })

    const token = jwtSign({ id: user._id, email: user.email, name: user.name })
    const userInfo = { id: userExists.id, name: userExists.name }
    return res.status(200).json({ userInfo, token })
  } catch (error) {
    return res.status(400).json({ ok: false, message: error })
  }
}

