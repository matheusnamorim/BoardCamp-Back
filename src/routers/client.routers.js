import express from "express";
import { registerClient } from "../controllers/client.controllers.js";
import { validateCustomers } from "../middlewares/client.middlewares.js";

const router = express.Router();

router.post('/customers', validateCustomers, registerClient);

export default router;