import Joi from 'joi'

export const loginUserSchema = Joi.object({
    loginName: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(8).required()
})

export const logoutUserSchema = Joi.object({
    refreshToken: Joi.string().required()
})

export const refreshTokenSchema = Joi.object({
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

export const sendVerifyEmailSchema = Joi.object({
    email: Joi.string().email().required()
})
