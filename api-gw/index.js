'use strict';

// ELK APM
const apm = require('elastic-apm-node').start(
  {
    serviceName: 'api-gw',
    secretToken: '',
    serverUrl: process.env.APM_URL || 'http://localhost:8200',
  },
);


const path = require('path');
const exphbs = require('express-handlebars');
const { Server } = require('./lib');
const { version, name } = require('./package.json');
const request = require('request-promise');
const clientService = require('./lib/services/clientService')(request);
const requestService = require('./lib/services/requestService');
const authorizeController = require('./lib/controllers/authorizeController')(clientService, requestService);
const authnController = require('./lib/controllers/authnController')(requestService);
const tokenController = require('./lib/controllers/tokenController')(requestService);
const config = require('./config/config');  // change to dotenv

const port = config.SERVER_PORT;
const server = new Server( { version, name, config });

// configure template engine
server.app.set('views', path.join(__dirname, 'views'));
server.app.engine('handlebars', exphbs({defaultLayout: 'main'}));
server.app.set('view engine', 'handlebars');

server.attachController(authorizeController);
server.attachController(authnController);
server.attachController(tokenController);

server.start(port);
