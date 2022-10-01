import { connection } from "../db/db.js";
import { STATUS_CODE } from "../enums/statusCode.js";
import {MESSAGES} from '../enums/messages.js';

const registerCategories = (req, res) => {
    const {name} = res.locals;
    try {
        connection.query('INSERT INTO categories (name) VALUES ($1);', [name]);
        return res.status(STATUS_CODE.CREATED).send(MESSAGES.CREATED);
    } catch (error) {
        return res.status(STATUS_CODE.SERVER_ERROR).send(MESSAGES.SERVER_ERROR);
    }

};

const listCategories = async (req, res) => {
    try {
        const list = await connection.query('SELECT * FROM categories;');
        return res.status(STATUS_CODE.OK).send(list.rows);
    } catch (error) {
        return res.status(STATUS_CODE.SERVER_ERROR).send(MESSAGES.SERVER_ERROR);
    }
};

export { registerCategories, listCategories };