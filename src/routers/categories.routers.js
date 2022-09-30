import express from "express";
import { listCategories, registerCategories } from '../controllers/categories.controllers.js';
import { validateCategories } from "../middlewares/categories.middlewares.js";

const router = express.Router();

router.post('/categories', validateCategories, registerCategories);
router.get('/categories', listCategories);

export default router;