import { connection } from "../db/db.js";
import { MESSAGES } from "../enums/messages.js";
import { STATUS_CODE } from "../enums/statusCode.js";

const registerClient = (req, res) => {
    const {name, cpf, phone, birthday} = res.locals.client;
    
    try {
        connection.query(`
        INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4);
        `, [name, phone, cpf, birthday]);
        return res.status(STATUS_CODE.CREATED).send(MESSAGES.CREATED);
    
    } catch (error) {
        return res.status(STATUS_CODE.SERVER_ERROR).send(MESSAGES.SERVER_ERROR);
    }
}

const getClientById = async (req, res) => {
    const { id } = req.params;
    
    try {
        const client = (await connection.query(
            `SELECT * FROM customers WHERE id = ($1);`
        , [id])).rows;
        
        

        const date = new Date(client[0].birthday);
        delete client[0].birthday;
        
        const newClient = {
            id: client[0].id,
            name: client[0].name,
            phone: client[0].phone,
            cpf: client[0].cpf,
            birhday: date.toISOString().substring(0, 10)
        }
        return res.status(STATUS_CODE.OK).send(newClient);   
    } catch (error) {
        return res.status(STATUS_CODE.SERVER_ERROR).send(MESSAGES.SERVER_ERROR);
    }
};

export { registerClient, getClientById };