import Joi from "joi"

export const portfolioCategorySchema = Joi.object(
    {
        name: Joi.string(),
        description: Joi.number(),
        isActive: Joi.boolean(),
    }
)
