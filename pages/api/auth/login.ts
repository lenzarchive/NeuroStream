import { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../lib/db'
import { verifyPassword, generateToken } from '../../../lib/auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' })
  }

  try {
    const user = await db.user.findUnique({ where: { email } })
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const isValid = await verifyPassword(password, user.password)
    
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = generateToken(user.id)
    
    res.status(200).json({
      message: 'Login successful',
      token,
      user: { id: user.id, name: user.name, email: user.email }
    })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}