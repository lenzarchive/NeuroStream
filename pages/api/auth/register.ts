import { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../lib/db'
import { hashPassword } from '../../../lib/auth'
import { verifyTurnstile } from '../../../lib/turnstile'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const turnstileVerified = await verifyTurnstile(req)

  if (!turnstileVerified) {
    return res.status(400).json({ message: 'Captcha verification failed' })
  }

  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  try {
    const existingUser = await db.user.findUnique({ where: { email } })
    
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const hashedPassword = await hashPassword(password)
    
    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    })

    res.status(201).json({ 
      message: 'User created successfully',
      user: { id: user.id, name: user.name, email: user.email }
    })
  } catch {
    res.status(500).json({ message: 'Internal server error' })
  }
}