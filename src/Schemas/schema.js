import Joi from "joi";

const categoriesSchema = Joi.object({
    name: Joi.string().trim().required()
});

const gamesSchema = Joi.object({
    name: Joi.string().trim().required(),
    stockTotal: Joi.number().greater(0).required(),
    pricePerDay: Joi.number().greater(0).required(),
});

export {categoriesSchema, gamesSchema};