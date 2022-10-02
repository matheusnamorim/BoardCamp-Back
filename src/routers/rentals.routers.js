import express from "express";
import { registerRentals } from "../controllers/rentals.controllers.js";
import { validateRentals } from "../middlewares/rentals.middlewares.js";

const router = express.Router();

router.post('/rentals', validateRentals, registerRentals);

export default router;