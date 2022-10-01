import express from "express";
import { validateCustomers } from "../middlewares/client.middlewares.js";

const router = express.Router();

router.post('/customers', validateCustomers);

export default router;