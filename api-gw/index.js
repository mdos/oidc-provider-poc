'use strict';

const { Server } = require('./lib');
const { authorizeRouter, tokenRouter } = require('./lib/routes');
const { version, name } = require('./package.json');
const config = require('./config/config');  // change to dotenv

const port = process.env.SERVER_PORT || 3000;
const server = new Server();

server.attachRouter('/authorize', authorizeRouter);
server.attachRouter('/token', tokenRouter);

server.attachRouteHandler('/', (req, res) => {
  res.json( { msg: `hello there!! ${Date.now()}` } );
});

server.start(port);
