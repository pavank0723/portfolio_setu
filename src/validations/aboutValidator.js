import Joi from "joi";

export const aboutSchema = Joi.object(
    {
        name :Joi.string().required(),
        description:Joi.string(),
        image:Joi.string(),
        isActive:Joi.boolean(),
    }
)