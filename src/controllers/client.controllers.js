import { connection } from "../db/db.js";
import { MESSAGES } from "../enums/messages.js";
import { STATUS_CODE } from "../enums/statusCode.js";

const registerClient = (req, res) => {
    const {name, cpf, phone, birthday} = res.locals.client;
    connection.query(`
        INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4);
    `, [name, phone, cpf, birthday]);
    return res.status(STATUS_CODE.CREATED).send(MESSAGES.CREATED);
}

export {registerClient};