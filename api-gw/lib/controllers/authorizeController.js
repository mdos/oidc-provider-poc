const _ = require('lodash');
const buildUrl = require('build-url');
const uuid = require('uuid/v4');

module.exports = (clientService, requestService) => {

  const authorize = (req, res) => {
    // RFC6749 Bad client_id / redirect_uri SHOULD inform RO and MUST NOT redirect
    if(!req.query.client_id || !req.query.redirect_uri) {
      // Anomaly event
      res.send("Invalid authorization attempt");
      return;
    }

    clientService.findClient(`${req.query.client_id}`)
    .then((client) => {
      console.log(`authorize(): findClient(${req.query.client_id}) returned: `)
      console.log(client);
      if(!client) {
         return res.json( { error: "Unknown client" });   // Anomaly event
      }
      if(!_.includes(client.redirect_uris, req.query.redirect_uri)) {
        return res.json({ error: `Bad redirect_uri: ${req.query.redirect_uri}`});    // Anomaly event
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
      let reqScopes = req.query.scope ? req.query.scope.split(' ') : [];
      let clientScopes = client.scope ? client.scope.split(' ') : [];
      if(_.difference(reqScopes, clientScopes).length > 0 ) {
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
        query     : req.query,
        csrfToken : csrf,
        key       : csrf,
        scopes    : reqScopes,
        client : client
      };

      return requestService.addRequest(request);
    })
    .then((request) => {
      return res.render('authn', 
      { 
        csrfToken : request.csrfToken, 
        scopes : request.scopes, 
        query: request.query 
      });
    })
    .catch((err) => {
      return res.status(500).send(`Server Error: ${err}`);
    });

  }

  return {
    routes: (app) => {
      app.get('/authorize', authorize);
    }
  }

};

