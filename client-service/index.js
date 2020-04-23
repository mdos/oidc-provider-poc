'use strict';

/*
// ELK APM
const apm = require('elastic-apm-node').start(
  {
    serviceName: 'client-service',
    secretToken: '',
    serverUrl: process.env.APM_URL || 'http://localhost:8200',
  },
);
*/


const path = require('path');
const exphbs = require('express-handlebars');
const { Server } = require('./lib');
const { clientRouter } = require('./lib/routes');
const { version, name } = require('./package.json');
const config = require('./config/config');  // change to dotenv

const port = config.SERVER_PORT
const server = new Server();

// configure template engine
server.app.set('views', path.join(__dirname, 'views'));
server.app.engine('handlebars', exphbs({defaultLayout: 'main'}));
server.app.set('view engine', 'handlebars');


server.attachRouter('/clients', clientRouter);

server.attachRouteHandler('/', (req, res) => {
  res.json( { msg: `hello there!! ${Date.now()}` } );
});

server.start(port);
