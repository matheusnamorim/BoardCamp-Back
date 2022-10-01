import { categoriesSchema } from "../Schemas/schema.js";
import { connection } from "../db/db.js";
import {STATUS_CODE} from '../enums/statusCode.js';
import {MESSAGES} from '../enums/messages.js';

async function validateCategories (req, res, next){
    const {name} = req.body;

    try {
        const validation = categoriesSchema.validate({name,}, {abortEarly: false});
        if(validation.error){
            const message = validation.error.details.map(value => value.message);
            res.status(STATUS_CODE.BAD_REQUEST).send(message);
            return;
        }
    
        const nameExists = await connection.query(
            `SELECT * FROM categories WHERE name = '${name}';
        `);
    
        if(nameExists.rows.length !== 0) return res.status(STATUS_CODE.CONFLICT).send(MESSAGES.CONFLICT);
    
        res.locals.name = name;
        next();
    } catch (error) {
        return res.status(STATUS_CODE.SERVER_ERROR).send(MESSAGES.SERVER_ERROR);
    }
}

export { validateCategories };