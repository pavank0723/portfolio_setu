import Joi from "joi"

export const categorySchema = Joi.object(
    {
        name: Joi.string().required(),
        description: Joi.number(),
        isActive: Joi.boolean(),
    }
)
