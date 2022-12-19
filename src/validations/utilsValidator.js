import Joi from "joi";

export const testimonialSchema = Joi.object(
    {
        name :Joi.string().required(),
        comment:Joi.string(),
        image:Joi.string(),
        rating:Joi.string(),
        isActive:Joi.string()
    }
)