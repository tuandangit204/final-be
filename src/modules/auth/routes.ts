import { Router } from 'express'
import { validateBody } from '~/middlewares/validation'
import { createUser, login, logout } from './controller'
import { createUserSchema, loginUserSchema, logoutUserSchema } from './schema'

const authRoutes = Router()

authRoutes.post('/register', validateBody(createUserSchema), createUser)
authRoutes.post('/login', validateBody(loginUserSchema), login)
authRoutes.post('/logout', validateBody(logoutUserSchema), logout)


export default authRoutes
