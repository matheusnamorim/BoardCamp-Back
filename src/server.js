import express from "express";
import categoriesRouter from './routers/categories.routers.js';
import gamesRouter from './routers/games.routers.js'

const server = express();
server.use(express.json());

server.use(categoriesRouter);
server.use(gamesRouter);

server.listen(4000, () => {
	console.log(`Server is listening on port 4000`);
});