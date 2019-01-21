const userService = require('../services/userService');

module.exports = {
  authorize(req, res) {
    // Error response on missing response_type
    console.log("INCOMING /authorize request:");
    console.log(`\tBODY: ${req.body}`);
    console.log(`\tQUERY: ${req.query}`);


    res.json( 
      { 
        msg: "authorize" 
      });
  },
  token(req, res) {
    // Annotate token endpoint responsibilities per RFC
    res.json( { msg: "token" });
  }
};

