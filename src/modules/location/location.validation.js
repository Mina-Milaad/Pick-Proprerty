

import Joi from "joi";


export const addLocationValidation = Joi.object({
    name: Joi.string().trim().min(3).max(500).required(),
});


export const updateLocationValidation = Joi.object({
    id: Joi.string().length(24).hex(),

    name: Joi.string().trim().min(3).max(500),
});