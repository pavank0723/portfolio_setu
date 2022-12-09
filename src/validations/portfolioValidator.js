import Joi from "joi"

export const portfolioCategorySchema = Joi.object(
    {
        name: Joi.string(),
        description: Joi.number(),
        isActive: Joi.boolean(),
    }
)

export const portfolioSchema = Joi.object(
    {
        title :Joi.string().required(),
        demo:Joi.string(),
        image:Joi.string(),
    }
)