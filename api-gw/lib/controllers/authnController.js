const buildUrl = require('build-url');
const randomstring = require('randomstring');

module.exports = (requestService) => {

  const authn = (req, res) => {
    //
    // Authentication (credentials/consent) POST handler. Should always use the CSRF token
    //
    requestService.deleteRequest(req.body.csrfToken)
    .then((request) => {
      if(!request) {
        // Security Event, possible CSRF attack
        return res.json({ error: 'invalid request'})
      }

      // User denied consent
      if(!req.body.Consent) {
        console.log('consent not given');
        let url = buildUrl(request.query.redirect_uri,
          {
            queryParams : {
              error: "access_denied"
            }
          }
        );
        return res.redirect(url);
      }

      // We support 'code' for Basic profile
      if(request.query.response_type != 'code') {
        let url = buildUrl(request.query.redirect_uri,
          {
            queryParams : {
              error: "unsuppored_response_type"
            }
          }
        );
        return res.redirect(url);
      }
      
      // Check user/pass against userService cred hash

      // Generate a code, save it, and redirect
      let code = randomstring.generate();
      request.key = code; // code becomes key for /token request search
      request.code = code;
      request.user = req.body.user;
      return requestService.addRequest(request);
    })
    .then((request) => {
      // Redirect with code and state
      let url = buildUrl(request.query.redirect_uri,
        {
          queryParams : {
            code  : request.code,
            state : request.query.state
          }
        }
      );
      console.log(`New authn Redirecting to : ${url}`);
      return res.redirect(url);
    })
    .catch((err) => {
      req.json({ error: 'internal server error'});
    });
  }

  return {
    routes: (app) => {
      app.post('/authorize/authn', authn);
    }
  }

};

