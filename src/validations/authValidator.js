import Joi from 'joi'
import { PASSWORD_RE } from '../utils/const'

export const registerSchema = Joi.object(
    {
        name:Joi.string().min(3).max(30).required(),
        email:Joi.string().email().required(),
        password:Joi.string().pattern(new RegExp(PASSWORD_RE)).required(),
        confirm_password:Joi.ref('password')
    }
)

export const loginSchema = Joi.object(
    {
        email:Joi.string().email().required(),
        password:Joi.string().pattern(new RegExp(PASSWORD_RE)).required()
    }
)
export const refreshSchema = Joi.object(
    {
        refresh_token : Joi.string().required()
    }
)
