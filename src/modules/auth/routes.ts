import { Router } from 'express'
import { validateBody } from '~/middlewares/validation'
import { login, logout } from './controller'
import { loginUserSchema, logoutUserSchema } from './schema'

const authRoutes = Router()

authRoutes.post('/login', validateBody(loginUserSchema), login)
authRoutes.post('/logout', validateBody(logoutUserSchema), logout)

export default authRoutes
