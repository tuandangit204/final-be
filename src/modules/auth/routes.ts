import { Router } from 'express'
import { validateBody } from '~/middlewares/validation'
import { login, logout, refreshToken } from './controller'
import { loginUserSchema, logoutUserSchema, refreshTokenSchema } from './schema'

const authRoutes = Router()

authRoutes.post('/login', validateBody(loginUserSchema), login)
authRoutes.post('/logout', validateBody(logoutUserSchema), logout)
authRoutes.post('/refresh', validateBody(refreshTokenSchema), refreshToken)

export default authRoutes
