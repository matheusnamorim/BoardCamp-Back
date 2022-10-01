import express from "express";
import { ListGames, registerGames } from "../controllers/games.controllers.js";
import { validateGames } from "../middlewares/games.middlewares.js";

const router = express.Router();

router.post('/games', validateGames, registerGames);
router.get('/games', ListGames);

export default router;