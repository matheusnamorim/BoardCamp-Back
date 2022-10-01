import { connection } from '../db/db.js';
import { MESSAGES } from '../enums/messages.js';
import { STATUS_CODE } from '../enums/statusCode.js';

const registerGames  = (req, res) => {
    const { name, image, stockTotal, categoryId, pricePerDay } = res.locals.games;

    connection.query('INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5);'
    , [name, image, stockTotal, categoryId, pricePerDay]);

    return res.status(STATUS_CODE.CREATED).send(MESSAGES.CREATED);
};

const ListGames = async (req, res) => {
    const list = await connection.query(`
    SELECT games.id, games.name, games.image,  games."stockTotal", games."categoryId", games."pricePerDay", categories.name AS "categoryName"   FROM games JOIN categories ON games."categoryId" = categories.id;`
    );
    return res.status(STATUS_CODE.OK).send(list.rows);
};

export {registerGames, ListGames};