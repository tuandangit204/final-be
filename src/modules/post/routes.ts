import { Router } from 'express'
import { authentication } from '~/middlewares/auth'
import { createPost } from './controller'
import { validateBody } from '~/middlewares/validation'
import { createPostSchema } from './schema'

const postRoutes = Router()

postRoutes.post('/', authentication, validateBody(createPostSchema), createPost)

export default postRoutes
