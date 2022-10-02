import Joi from "joi";

const categoriesSchema = Joi.object({
    name: Joi.string().trim().required()
});

const gamesSchema = Joi.object({
    name: Joi.string().trim().required(),
    stockTotal: Joi.number().greater(0).required(),
    pricePerDay: Joi.number().greater(0).required(),
});

const costumersSchema = Joi.object({
    cpf: Joi.string().length(11).required(),
    phone: Joi.string().min(10).max(11).required(),
    name: Joi.string().trim().required(),
    birthday: Joi.date().less('now').required()
});

const rentalsSchema = Joi.object({
    daysRented: Joi.number().greater(0).required()
});

export {categoriesSchema, gamesSchema, costumersSchema, rentalsSchema};