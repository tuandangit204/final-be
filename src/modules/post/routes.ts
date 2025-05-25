import { Router } from 'express'
import { authentication } from '~/middlewares/auth'
import { validateBody, validateParams, validateQuery } from '~/middlewares/validation'
import commentRoutes from '../comment/routes'
import { createPost, findOne, getPostByCondition } from './controller'
import { createPostSchema, findOnePostSchema, getPostByConditionSchema } from './schema'

const postRoutes = Router()


postRoutes.get('/', authentication, validateQuery(getPostByConditionSchema), getPostByCondition)
postRoutes.post('/', authentication, validateBody(createPostSchema), createPost)
postRoutes.get('/:id', authentication, validateParams(findOnePostSchema), findOne)
postRoutes.use('/:id', authentication, validateParams(findOnePostSchema), commentRoutes)

export default postRoutes
