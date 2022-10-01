import express from "express";
import categoriesRouter from './routers/categories.routers.js';
import gamesRouter from './routers/games.routers.js'
import clientRouter from './routers/client.routers.js';

const server = express();
server.use(express.json());

server.use(categoriesRouter);
server.use(gamesRouter);
server.use(clientRouter);

server.listen(4000, () => {
	console.log(`Server is listening on port 4000`);
});