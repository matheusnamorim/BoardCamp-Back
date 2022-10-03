import { connection } from '../db/db.js';
import {STATUS_CODE} from '../enums/statusCode.js';
import {MESSAGES} from '../enums/messages.js';
import {rentalsSchema} from '../Schemas/schema.js';

async function validateRentals(req, res, next){
    const {  customerId, gameId, daysRented} = req.body;

    try {
        const validation = rentalsSchema.validate({daysRented}, {abortEarly: false});
        if(validation.error){
            const message = validation.error.details.map(value => value.message);
            res.status(STATUS_CODE.BAD_REQUEST).send(message);
            return;
        }
    
        const clientExist = (await connection.query(
            `SELECT * FROM customers WHERE id = $1;`
        , [customerId])).rows;
        if(clientExist.length === 0) return res.status(STATUS_CODE.BAD_REQUEST).send(MESSAGES.CLIENT_NOT_FOUND);
        const gamesExist = (await connection.query(
            `SELECT * FROM games WHERE id = $1;`
            , [gameId])).rows;

        if(gamesExist.length === 0) return res.status(STATUS_CODE.BAD_REQUEST).send(MESSAGES.GAME_NOT_FOUND);
        

        const checkStock = (await connection.query(
            `SELECT * FROM rentals JOIN games ON rentals."gameId" = games.id WHERE rentals."gameId" = $1;`, [gameId]
        )).rows;
        if(checkStock.length >= checkStock[0].stockTotal) return res.status(STATUS_CODE.BAD_REQUEST).send(MESSAGES.STOCK_LIMIT);

        res.locals.games = gamesExist[0];
        next();
    } catch (error) {
        return res.status(STATUS_CODE.SERVER_ERROR).send(MESSAGES.SERVER_ERROR);  
    }
}

async function validateFinalRentals(req, res, next){
    const {id} = req.params;

    try {
        const idExist = (await connection.query(
            `SELECT * FROM rentals WHERE id = $1;`
        , [id])).rows;

        if(idExist.length === 0) return res.status(STATUS_CODE.NOT_FOUND).send(MESSAGES.ID_NOT_FOUND);
        if(idExist[0].returnDate !== null) return res.status(STATUS_CODE.BAD_REQUEST).send(MESSAGES.RENTALS_FINISH);
        
        res.locals.id = idExist;
        next();
    } catch (error) {
        return res.status(STATUS_CODE.SERVER_ERROR).send(MESSAGES.SERVER_ERROR);
    }
}

export {validateRentals, validateFinalRentals};