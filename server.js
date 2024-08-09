import startServer from './libs/boot';
import injectRoutes from './routes';
import injectMiddlewares from './libs/middlewares';
import express from 'express';

const server = express();

injectMiddlewares(server);
injectRoutes(server);
startServer(server);

export default server;