import express from "express";
import { registerGames } from "../controllers/games.controllers.js";
import { validateGames } from "../middlewares/games.middlewares.js";

const router = express.Router();

router.post('/games', validateGames, registerGames);


export default router;