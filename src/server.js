import express from "express";

const server = express();

server.listen(4000, () => {
	console.log(`Server is listening on port 4000`);
});