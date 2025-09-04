import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 12)
}

export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword)
}

export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, process.env.NEXTAUTH_SECRET!, { expiresIn: '1d' })
}

interface JWTPayload {
  userId: string
  iat?: number
  exp?: number
}

export const verifyToken = (token: string): JWTPayload | null => {
  try {
    return jwt.verify(token, process.env.NEXTAUTH_SECRET!) as JWTPayload
  } catch {
    return null
  }
}