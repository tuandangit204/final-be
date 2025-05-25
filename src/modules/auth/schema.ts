import Joi from 'joi'

export const createUserSchema = Joi.object({
    loginName: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(8).required(),
    firstName: Joi.string().min(1).max(50).required(),
    lastName: Joi.string().min(1).max(50).required(),
    location: Joi.string().max(100).optional().allow(''),
    description: Joi.string().max(500).optional().allow(''),
    occupation: Joi.string().max(100).optional().allow('')
})

export const updateUserSchema = Joi.object({
    firstName: Joi.string().min(1).max(50).optional(),
    lastName: Joi.string().min(1).max(50).optional(),
    location: Joi.string().max(100).optional().allow(''),
    description: Joi.string().max(500).optional().allow(''),
    occupation: Joi.string().max(100).optional().allow('')
})

export const loginUserSchema = Joi.object({
    loginName: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(8).required()
})

export const logoutUserSchema = Joi.object({
    refreshToken: Joi.string().required()
})

export const changePasswordSchema = Joi.object({
    oldPassword: Joi.string().min(8).required(),
    newPassword: Joi.string().min(8).required()
})

export const resetPasswordSchema = Joi.object({
    loginName: Joi.string().min(3).max(30).required(),
    newPassword: Joi.string().min(8).required()
})
