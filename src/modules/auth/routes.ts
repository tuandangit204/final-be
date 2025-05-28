import { Router } from 'express'
import { validateBody } from '~/middlewares/validation'
import { getUserInfo, login, logout, refreshToken, testMail } from './controller'
import { loginUserSchema, logoutUserSchema, refreshTokenSchema } from './schema'
import { authentication } from '~/middlewares/auth'

const authRoutes = Router()

authRoutes.post('/login', validateBody(loginUserSchema), login)
authRoutes.post('/logout', validateBody(logoutUserSchema), logout)
authRoutes.post('/refresh', validateBody(refreshTokenSchema), refreshToken)
authRoutes.get('/info', authentication, getUserInfo)
authRoutes.post('/test-mail', testMail)

export default authRoutes
