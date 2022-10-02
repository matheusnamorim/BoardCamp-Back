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

export {registerRentals};