import { connection } from '../db/db.js';
import { MESSAGES } from '../enums/messages.js';
import { STATUS_CODE } from '../enums/statusCode.js';

const registerGames  = (req, res) => {
    const { name, image, stockTotal, categoryId, pricePerDay } = res.locals.games;

    try {
        connection.query('INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5);'
        , [name, image, stockTotal, categoryId, pricePerDay]);

        return res.status(STATUS_CODE.CREATED).send(MESSAGES.CREATED);
    } catch (error) {
        return res.status(STATUS_CODE.SERVER_ERROR).send(MESSAGES.SERVER_ERROR);
    }
};

const ListGames = async (req, res) => {

    const {name} = req.query;
    try {
        const list = await connection.query(`
        SELECT games.* , categories.name AS "categoryName" 
            FROM games JOIN categories ON games."categoryId" = categories.id;`
        );
        if(name){
            const list = await connection.query(`
                SELECT games.* , categories.name AS "categoryName" 
                    FROM games JOIN categories ON games."categoryId" = categories.id WHERE games.name ILIKE '${name}%';
            `);
            return res.status(STATUS_CODE.OK).send(list.rows);
        }
        return res.status(STATUS_CODE.OK).send(list.rows); 
    } catch (error) {
        return res.status(STATUS_CODE.SERVER_ERROR).send(MESSAGES.SERVER_ERROR);
    }
};

export {registerGames, ListGames};