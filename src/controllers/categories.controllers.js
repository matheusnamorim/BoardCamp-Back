import { connection } from "../db/db.js";
import { STATUS_CODE } from "../enums/statusCode.js";
import {MESSAGES} from '../enums/messages.js';

const registerCategories = (req, res) => {
    const {name} = res.locals;
    connection.query('INSERT INTO categories (name) VALUES ($1);', [name]);
	return res.status(STATUS_CODE.CREATED).send(MESSAGES.CREATED);
};

const listCategories = async (req, res) => {
    const list = await connection.query('SELECT * FROM categories;');
    return res.status(STATUS_CODE.OK).send(list.rows);
};

export { registerCategories, listCategories };