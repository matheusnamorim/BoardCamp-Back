import express from "express";
import cors from 'cors';
import categoriesRouter from './routers/categories.routers.js';
import gamesRouter from './routers/games.routers.js'
import clientRouter from './routers/client.routers.js';
import rentalsRouter from './routers/rentals.routers.js';

const server = express();
server.use(express.json());
server.use(cors());

server.use(categoriesRouter);
server.use(gamesRouter);
server.use(clientRouter);
server.use(rentalsRouter);

server.listen(4000, () => {
	console.log(`Server is listening on port 4000`);
});