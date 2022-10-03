import express from "express";
import { finishRentals, listRentals, registerRentals } from "../controllers/rentals.controllers.js";
import { validateFinalRentals, validateRentals } from "../middlewares/rentals.middlewares.js";

const router = express.Router();

router.post('/rentals', validateRentals, registerRentals);
router.get('/rentals', listRentals);
router.post('/rentals/:id/return', validateFinalRentals, finishRentals);

export default router;