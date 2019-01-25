// clientService - Handles requests for OAuth Client information

//const request = require('request-promise');
const config = require('../../config/config');

module.exports = ( request ) => { 
  return {
    findClient: (client_id) => {
      return new Promise( (resolve, reject) => {

        var opts = {
          uri: config.CLIENT_SERVICE_URI,
          qs: {
            client_id : client_id
          },
          json: true
        };
        
        request(opts)
        .then( (client) => {
          resolve(client);
        })
        .catch( (err) => {
          reject(err);
        })
      });
    },

    upsertClient : (client) => {
      throw new Error("not yet implemented");
    },

    deleteClient : (client) => {
      throw new Error("not yet implemented");
    }
  }
};