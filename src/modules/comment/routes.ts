import { Router } from 'express'
import { validateBody } from '~/middlewares/validation'
import { commentSchema } from './schema'
import { createComment } from './controller'

const commentRoutes = Router({ mergeParams: true })

commentRoutes.post('/comment', validateBody(commentSchema), createComment)

export default commentRoutes
