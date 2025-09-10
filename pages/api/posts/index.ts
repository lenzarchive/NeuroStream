import { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../lib/db'
import { verifyToken } from '../../../lib/auth'
import { Server } from 'socket.io'

interface NextApiRequestWithSocket extends NextApiRequest {
  io?: Server;
}

export default async function handler(req: NextApiRequestWithSocket, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const posts = await db.post.findMany({
        where: { published: true },
        include: { author: { select: { name: true } } },
        orderBy: { createdAt: 'desc' }
      })
      
      res.status(200).json(posts)
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch posts' })
    }
  } 
  
  else if (req.method === 'POST') {
    const token = req.headers.authorization?.replace('Bearer ', '')
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' })
    }

    const decoded = verifyToken(token)
    
    if (!decoded) {
      return res.status(401).json({ message: 'Invalid token' })
    }

    const { title, content } = req.body

    if (!title) {
      return res.status(400).json({ message: 'Title is required' })
    }

    try {
      const post = await db.post.create({
        data: {
          title,
          content: content || '',
          authorId: decoded.userId,
          published: true
        },
        include: { author: { select: { name: true } } }
      })

      if (req.io) {
        req.io.emit('newPost', post)
      }

      res.status(201).json(post)
    } catch {
      res.status(500).json({ message: 'Failed to create post' })
    }
  } 
  
  else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}