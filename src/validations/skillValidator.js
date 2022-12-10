import Joi from "joi"

export const skillCategorySchema = Joi.object(
    {
        name: Joi.string(),
        description: Joi.number(),
        isActive: Joi.boolean(),
    }
)

export const skillSchema = Joi.object(
    {
        title :Joi.string().required(),
        subtitle:Joi.string().required(),
        image:Joi.string(),
    }
)