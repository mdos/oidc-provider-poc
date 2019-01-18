'use strict';

const apm = require('elastic-apm-node').start(
  {
    serviceName: 'api-gw',
    secretToken: '',
    serverUrl: process.env.APM_URL || 'http://localhost:8200',
  },
);

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const http = require('http');
const uuid4 = require('uuid/v4');
const util = require('util');
const { name, version } = require('./package.json');

const portConfig = Symbol('port');
const hostConfig = Symbol('host');

//
// Server class attaches routes automatically from ./controllers folder
//
class Server {
    constructor(options = {}) {
        // check for required options, throw here

        this[portConfig] = options.port || null;
        this[hostConfig] = options.host || null;
        this.config = options.config || {};
        this.app = options.app || express();

        // configure middleware
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

        // attaching our own http server to express allows for start and stop
        // operations
        this.server = http.createServer(this.app);
    }

    get url() {
        return `http://${this.address}:${this.port}`;
    }

    get address() {
        return this.server.address().address;
    }

    get port() {
        return this.server.address().port;
    }

    async start(port) {
        if(port) {
            this[portConfig] = port;
        }
        const listen = util.promisify(this.server.listen.bind(this.server));
        return listen(this[portConfig], this[hostConfig]);
    }

    async stop() {
        const stop = util.promisify(this.server.close.bind(this.server));
        return stop();
    }

}

module.exports = Server;

