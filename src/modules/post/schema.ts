import Joi from 'joi'

export const createPostSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    author: Joi.string().required(),
    content: Joi.string().min(10).max(5000).required()
})

export const getPostsSchema = Joi.object({
    page: Joi.number().integer().min(1).default(1),
    size: Joi.number().integer().min(1).max(100).default(10)
})

export const updatePostSchema = Joi.object({
    id: Joi.string().required(),
    title: Joi.string().min(3).max(100).optional(),
    author: Joi.string().optional(),
    content: Joi.string().min(10).max(5000).optional()
})
