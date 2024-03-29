import jwt from 'jsonwebtoken'

export const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    if (token) {
      const decodedData = jwt.verify(token, process.env.JWT_SECRET)
      req.userId = decodedData?.id
    }
    next()
  } catch (error) {
    return res.status(401).json({ ok: false, message: 'El token no es válido' })
  }
}