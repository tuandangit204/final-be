import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import dotenv from 'dotenv'

// Extend Express Request interface to include 'user'

declare module 'express-serve-static-core' {
    interface Request {
        user?: string | JwtPayload
    }
}

dotenv.config()

export const authentication = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const jwtSecret = process.env.JWT_ACCESS_TOKEN_SECRET

        if (!jwtSecret) {
            res.status(500).json({ message: 'JWT secret is not configured' })
            return
        }

        const authHeader = req.headers.authorization
        if (!authHeader?.startsWith('Bearer ')) {
            res.status(401).json({ message: 'Authorization header is missing or invalid' })
            return
        }

        const token = authHeader.split(' ')[1]

        const decoded = jwt.verify(token, jwtSecret)

        req.user = decoded

        next()
    } catch (error) {
        console.error('Authentication error:', error)
        res.status(401).json({ message: 'Unauthorized access' })
        return
    }
}
