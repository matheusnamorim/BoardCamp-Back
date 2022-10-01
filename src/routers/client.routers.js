import express from "express";
import { registerClient, getClientById } from "../controllers/client.controllers.js";
import { validateCustomers } from "../middlewares/client.middlewares.js";

const router = express.Router();

router.post('/customers', validateCustomers, registerClient);
router.get('/customers/:id', getClientById);

export default router;