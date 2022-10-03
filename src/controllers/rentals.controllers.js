import dayjs from "dayjs";
import { connection } from "../db/db.js";
import { MESSAGES } from "../enums/messages.js";
import { STATUS_CODE } from "../enums/statusCode.js";

const registerRentals  = (req, res) => {
    const { games } = res.locals;
    const {customerId,gameId,daysRented} = req.body;

    try {
        connection.query(`INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") 
        VALUES ($1, $2, $3, $4, $5, $6, $7);`, [customerId, gameId, dayjs().format('YYYY-MM-DD'), daysRented, null, games.pricePerDay*daysRented, null]);
        return res.status(STATUS_CODE.CREATED).send(MESSAGES.CREATED);
    } catch (error) {
        return res.status(STATUS_CODE.SERVER_ERROR).send(MESSAGES.SERVER_ERROR);
    }
};

const listRentals = async (req, res) => {
    const {customerId, gameId} = req.query;
    const newList = [];
    try {
        
        const list_Rentals = (await connection.query(
            `SELECT * FROM rentals;`
        )).rows;
        const list_Customers = (await connection.query(
            `SELECT customers.id, customers.name FROM customers;`
        )).rows;
        const list_Games = (await connection.query(
            `SELECT games.id, games.name, games."categoryId" , categories.name AS "categoryName" 
            FROM games JOIN categories ON games."categoryId" = categories.id;`
        )).rows;

        const rentals = list_Rentals.map((value) => ({
            ...value,
            customer: list_Customers.find((v) => v.id === value.customerId),
            game: list_Games.find((v) => v.id === value.gameId)
        }));
        
        rentals.forEach(function(elemento){
            const date = new Date(elemento.rentDate);
            newList.push({
                id: elemento.id,
                customerId: elemento.customerId,
                gameId: elemento.gameId,
                rentDate: date.toISOString().substring(0, 10),
                daysRented: elemento.daysRented,
                returnDate: elemento.returnDate,
                originalPrice: elemento.originalPrice,
                delayFee: elemento.delayFee,
                customers: elemento.customer,
                game: elemento.game
            })
            delete elemento.rentDay;
        });

        if(customerId){
            const listByCustomerId = rentals.filter((value) => value.customer.id === Number(customerId));
            return res.status(STATUS_CODE.OK).send(listByCustomerId);
        }
        if(gameId){
            const listByGameId = rentals.filter((value) => value.game.id === Number(gameId));
            return res.status(STATUS_CODE.OK).send(listByGameId);
        }
        return res.status(STATUS_CODE.OK).send(newList);
    } catch (error) {
        return res.status(STATUS_CODE.SERVER_ERROR).send(MESSAGES.SERVER_ERROR);
    }
};

const finishRentals = (req, res) => {
    const {id} = res.locals;
    const Id = req.params.id;

    try {
        const date = id[0].rentDate;
        const today = new Date();
        const differenceDays = parseInt((today - date) / (1000 * 3600 * 24));
        
        let newDelayFee = null;
        if(differenceDays > id[0].daysRented){
            const pricePerDay = id[0].originalPrice/id[0].daysRented;
            newDelayFee = (differenceDays*pricePerDay);
        }

        connection.query(`UPDATE rentals SET "returnDate" = $1, "delayFee" = $2 WHERE id = $3`, 
        [dayjs().format('YYYY-MM-DD'), newDelayFee, Id]);

        return res.status(STATUS_CODE.OK).send(MESSAGES.UPDATE_SUCCESS);
    } catch (error) {
        return res.status(STATUS_CODE.SERVER_ERROR).send(MESSAGES.SERVER_ERROR);
    }
};

const deleteRentals = (req, res) => {
    const {id} = req.params;
    
    try {
        connection.query(`DELETE FROM rentals WHERE id = $1`, [id]);
        return res.status(STATUS_CODE.OK).send(MESSAGES.DELETE);
    } catch (error) {
        return res.status(STATUS_CODE.SERVER_ERROR).send(MESSAGES.SERVER_ERROR);
    }
};

export {registerRentals, listRentals, finishRentals, deleteRentals};