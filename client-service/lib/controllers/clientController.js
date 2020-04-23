const _ = require('lodash');
const buildUrl = require('build-url');
const uuid = require('uuid/v4');
const clientService = require('../services/clientService');

module.exports = {
  getClient(req, res) {
    clientService.findClient(`${req.query.client_id}`)
    .then((client) => {
      return res.json(client);
    })
  },
  postClient(req, res) {
    return res.json( { err: "unsupported operation"});
  }
};

