const randomstring = require('randomstring');
const _ = require('lodash');
const jwt = require('../services/jwtService');

module.exports = (requestService) => {

  const token = (req, res) => {
    // Incoming token requests from the (confidential) client on backchannel
    console.log(`/token endpoint: req.body: `);
    console.log(req.body);
    // Check for client_id and client_secret
    let client_id = null, client_secret = null;

    let auth_header = req.headers['authorization'];
    if(auth_header) {
      // unpack base64(client_id:client_secret)
      let b64 = auth_header.slice('basic '.length);
      [client_id, client_secret] = new Buffer(b64, 'base64').toString().split(':');
      console.log(`client_id: ${client_id}, client_secret: ${client_secret}`);
    }
    if(!client_id) {
      return res.status(401).json( { error: "invalid_client" });   // Anomaly event
    }
    if(!req.body.code || !client_secret) {
      return res.status(401).json( { error: 'invalid_request'} );
    }

 
    // get client request associated with the code
    requestService.deleteRequest(`${req.body.code}`)
    .then((request) => {
      console.log(`token(): deleteRequest(${req.body.code}) returned: `)
      console.log(request);
      if(!_.includes(request.query.redirect_uri, req.body.redirect_uri)) {
        console.log("got here");
        return res.json({ error: `invalid_request`});    // Anomaly event
      }
      if(!req.body.grant_type == "authorization_code") {
        console.log('Bad grant_type');
        let url = buildUrl(req.query.redirect_uri, {
          queryParams: {
            error: "invalid_request"
          }
        });
        return res.redirect(url);
      }

      const access_token = jwt.createJwt(
        { iss: 'http://localhost:3000', exp: (Date.now() + 6000) , scope: request.query.scope }
      );
  
      console.log("access_token: ");
      console.log(access_token);
  
      res.json( { 
        access_token: access_token,
        token_type: 'Bearer',
        scope: 'openid'
      } );
  
    });
  }

  return {
    routes: (app) => {
      app.post('/authorize/token', token);
    }
  }

};

