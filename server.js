import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { graphqlExpress } from 'graphql-server-express';
import { PRODUCTION_API_HOST, PRODUCTION_REMOTE_HOST, PRODUCTION } from 'globals';
import { schema } from './global-schema';

// setup environment
if (!PRODUCTION) { // localhost
	var host = 'http://localhost';
	var remote_host = 'http://localhost';
	var cors_port = 4200;
	var cors_host = remote_host + ':' + cors_port;
} else { //production
	var host = PRODUCTION_API_HOST;
	var remote_host = PRODUCTION_REMOTE_HOST;
	var cors_host = remote_host;
}

const PORT = 4000;
const server = express();

//restrict to origin port for safety
server.use('*', cors({
	origin: cors_host
}));

server.use('/', bodyParser.json(), graphqlExpress({
	schema
}));

server.listen(PORT, () =>
	console.log(`GraphQL Server is now running on ${host}:${PORT}`)
);