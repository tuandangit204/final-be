import { Router } from 'express'
import { authentication } from '~/middlewares/auth'
import { validateBody, validateParams } from '~/middlewares/validation'
import commentRoutes from '../comment/routes'
import { createPost, findOne } from './controller'
import { createPostSchema, findOnePostSchema } from './schema'

const postRoutes = Router()

postRoutes.post('/', authentication, validateBody(createPostSchema), createPost)
postRoutes.get('/:id', authentication, validateParams(findOnePostSchema), findOne)
postRoutes.use('/:id', authentication, validateParams(findOnePostSchema), commentRoutes)

export default postRoutes
