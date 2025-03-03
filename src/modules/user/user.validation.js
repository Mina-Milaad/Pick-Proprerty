import Joi from "joi";

export const updateUserValidation = Joi.object({
    id: Joi.string().length(24).hex(),
    userName: Joi.string().min(3).max(30),
    email: Joi.string().email(),
    password: Joi.string().min(6),
    isBlocked: Joi.boolean().default(false),
    role: Joi.string().valid('admin', 'user', 'agent').default('user'),
    isActive: Joi.boolean().default(true)
});