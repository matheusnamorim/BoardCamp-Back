import {gamesSchema} from '../Schemas/schema.js';
import {STATUS_CODE} from '../enums/statusCode.js';
import { connection } from '../db/db.js';
import { MESSAGES } from '../enums/messages.js';

async function validateGames (req, res, next){
    const { categoryId, name, stockTotal, pricePerDay } = req.body;
    
    try {
        const validation = gamesSchema.validate({name, stockTotal, pricePerDay}, {abortEarly: false});
        if(validation.error){
            const message = validation.error.details.map(value => value.message);
            res.status(STATUS_CODE.BAD_REQUEST).send(message);
            return;
        }
    
        const idExist = await connection.query(`SELECT * FROM categories WHERE id = '${categoryId}';`);
        if(idExist.rows.length === 0)  return res.status(STATUS_CODE.BAD_REQUEST).send(MESSAGES.CATEGORY_NOT_FOUND);
        const nameExists = await connection.query(`SELECT * FROM categories WHERE name = '${name}';`);
        if(nameExists.rows.length !== 0) return res.status(STATUS_CODE.CONFLICT).send(MESSAGES.CONFLICT);
    
        res.locals.games = req.body;
        next();
    } catch (error) {
        return res.status(STATUS_CODE.SERVER_ERROR).send(MESSAGES.SERVER_ERROR);  
    }

}

export {validateGames};