import Joi from 'joi'

export const createPostSchema = Joi.object({
    title: Joi.string().required().max(100).min(3),
    imageUrl: Joi.string().required().uri()
})
