// Service to manage in-flight OAuth/OpenID requests.
// This Service would likely in the future change to HTTP requests to
// a separate domain microservice fronting a DB

const _ = require('lodash');

let requests = [];

module.exports = { 
  getRequest(key) {
    console.log(`getRequest(${key})`);
    return new Promise( (resolve, reject) => {
      let request = requests.find( (el) => el.key == key);
      resolve(client)
    });
  },
  addRequest(request) {
    console.log(`addRequest() key: ${request.key}`);
    return new Promise( (resolve, reject) => {
      requests.push(request);
      resolve(request);
    });
  },
  deleteRequest(key) {
    let deleted = _.remove(requests, (el) => { return el.key == key; });
    console.log(`Deleted request, key=${key}`);
    return new Promise( (resolve, reject) => {
      resolve(deleted[0]);
    });
  }
};