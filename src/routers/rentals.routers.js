import express from "express";
import { deleteRentals, finishRentals, listRentals, registerRentals } from "../controllers/rentals.controllers.js";
import { validateFinalRentals, validateRentals } from "../middlewares/rentals.middlewares.js";

const router = express.Router();

router.post('/rentals', validateRentals, registerRentals);
router.get('/rentals', listRentals);
router.post('/rentals/:id/return', validateFinalRentals, finishRentals);
router.delete('/rentals/:id', validateFinalRentals, deleteRentals);

export default router;