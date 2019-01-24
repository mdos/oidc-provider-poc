const _ = require('lodash');
const buildUrl = require('build-url');
const uuid = require('uuid/v4');
const userService = require('../services/userService');
const clientService = require('../services/clientService');

module.exports = {
  authorize(req, res) {
    // RFC6749 Bad client_id / redirect_uri SHOULD inform RO and MUST NOT redirect
    if(!req.query.client_id || !req.query.redirect_uri) {
      // Anomaly event
      res.send("Invalid authorization attempt");
      return;
    }

    clientService.findClient(`${req.query.client_id}`)
    .then((client) => {
      if(!client) {
         return res.json( { error: "Unknown client" });   // Anomaly event
      }
      if(!_.includes(client.redirect_uris, req.query.redirect_uri)) {
        return res.json({ error: "Bad redirect_uri"});    // Anomaly event
      }
      if(!req.query.response_type) {
        let url = buildUrl(req.query.redirect_uri, {
          queryParams: {
            error: "invalid_request"
          }
        });
        return res.redirect(url);
      }

      // RFC6749 4.1.2.1 - check for invalid scope
      let reqScope = req.query.scope ? req.query.scope.split(' ') : [];
      let clientScope = client.scope ? client.scope.split(' ') : [];
      if(_.difference(reqScope, clientScope).length > 0 ) {
        let url = buildUrl(req.query.redirect_uri,{
          queryParams : {
            error: "invalid_scope"
          }
        });
        console.log(`Redirecting to ${url}`);
        return res.redirect(url);
      }

      // Present RO/RP with authentication / consent login screen
      let csrf = uuid();
      let request = {
        query : req.query,
        csrfToken : csrf
      };
      return res.render('authn', { csrfToken : csrf, scopes : reqScope, query: req.query });
    })

  },
  authn(req, res) {
    // Authentication handler. Should always use the CSRF token
    console.log('Incoming authn request body:');
    console.log(req.body);
    res.json(req.body);
  },
  token(req, res) {
    // Annotate token endpoint responsibilities per RFC
    res.json( { msg: "token" });
  }
};

