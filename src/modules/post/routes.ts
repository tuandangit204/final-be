import { Router } from 'express'
import { validateBody, validateQuery } from '~/middlewares/validation'
import { createPostSchema, getPostsSchema, updatePostSchema } from './schema'
import { createPost, getPosts, updatePost } from './controller'

const postRoutes = Router()

postRoutes.post('/', validateBody(createPostSchema), createPost)
postRoutes.put('/', validateBody(updatePostSchema), updatePost)
postRoutes.get('/', validateQuery(getPostsSchema), getPosts)

export default postRoutes
