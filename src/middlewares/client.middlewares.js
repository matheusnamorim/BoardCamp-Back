import { costumersSchema } from "../Schemas/schema.js";
import {STATUS_CODE} from '../enums/statusCode.js';
import { connection } from '../db/db.js';
import { MESSAGES } from '../enums/messages.js';

async function validateCustomers (req, res, next){
    const {cpf, phone} = req.body;
    const validation = costumersSchema.validate(req.body, {abortEarly: false});
    if(validation.error){
        const message = validation.error.details.map(value => value.message);
        res.status(STATUS_CODE.BAD_REQUEST).send(message);
        return;
    }
    if(isNaN(cpf) || isNaN(phone)) return res.status(STATUS_CODE.BAD_REQUEST).send(MESSAGES.IS_NAN);
    
    const cpfExist = await connection.query(`SELECT * FROM customers WHERE cpf = ($1)`, [cpf]);
    if(cpfExist.rows.length !== 0) return res.status(STATUS_CODE.CONFLICT).send(MESSAGES.CPF_CONFLICT);
    res.locals.client = req.body;
    next();
}

export {validateCustomers};
