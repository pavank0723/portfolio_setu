import Joi from "joi"

export const certificateCategorySchema = Joi.object(
    {
        name: Joi.string(),
        description: Joi.number(),
        isActive: Joi.boolean(),
    }
)

export const certificateSchema = Joi.object(
    {
        title :Joi.string().required(),
        demo:Joi.string(),
        image:Joi.string(),
    }
)