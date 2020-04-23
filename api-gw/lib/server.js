'use strict';

//
// This server class is a reusable generic abstraction atop Express 4, as such it should
// be available to all microservices, and should be pushed to a private module
// registry (eg. PackageCloud)
//

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const http = require('http');
const util = require('util');

const portConfig = Symbol('port');
const hostConfig = Symbol('host');

/*
 * Server : Class used to manage the express application for our endpoint.
 *
 * Synopsis:
 * 
 *  Express operates by esentially applying middleware functions in a stack to incoming
 *  HTTP requests, this class handles much of the boilerplate required to configure and
 *  start a server. The middleware / route / error handling stack can become easily
 *  obfuscated if those functions are scattered in code.
 *  This class allows for a single point of truth to allow for easier reasoning around
 *  the processing pipeline.
 * 
 *  Exporting this functionality as a lib / class allows for much easier testing as well
 *
 * Usage:
 * 
 *  const server = new Server( { opts } );
 *  server.attachMiddleware(handler);
 *  server.attachRouter('/api1', router1);
 *  server.attachRouter('/api2', router2);
 *  server.attachErrorHandler(handler);
 *  server.start([port]);
 * 
 */
class Server {
    constructor(options = {}) {
        // check for required options, throw here

        this[portConfig] = options.port || null;
        this[hostConfig] = options.host || null;
        this.config = options.config || {};
        this.version = options.version || '';
        this.app = options.app || express();

        // configure middleware
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

        // attaching our own http server to express allows for start and stop
        // operations
        this.server = http.createServer(this.app);
    }

    // Attaches a controller to the server, which will configure it's own routes
    attachController(controller) {
      controller.routes(this.app);
    }

    // Attaches an express Router to the route (which in turn generally hooks up a controller)
    attachRouter(route, router) {
      this.app.use(route, router);
    }

    // Attaches a route handler - function signature (req, res)
    attachRouteHandler(route, handler) {
      if(handler.length != 2) { throw new Error(`Expected two args to router, got ${handler.length}`); }
      this.app.use(route, handler);
    }

    // Attach an error handler - function signature (err, req, res, next)
    attachErrorHandler(handler) {
      if(handler.length != 4) { throw new Error(`Expected four args to error handlerr, got ${handler.length}`); }
      this.app.use(handler);
    }

    // Attach middleware - function signature (req, res, next)
    attachMiddleware(handler) {
      if(handler.length != 3) { throw new Error(`Expected three args to middleware handlerr, got ${handler.length}`); }
      this.app.use(handler);
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
        console.log(`Listening on ${this[hostConfig]} : ${this[portConfig]}`);
        return listen(this[portConfig], this[hostConfig]);
    }

    async stop() {
        const stop = util.promisify(this.server.close.bind(this.server));
        return stop();
    }

}

module.exports = Server;

