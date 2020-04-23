// Should call out to mongoDB collection / Schema here

let clients = [
  {
    client_id       : "openid-cert-id",
    name            : "OpenId Certification Client",
    client_secret   : "openid-cert-secret",
    redirect_uris   : ["https://op.certification.openid.net:61293/authz_cb"], 
    scope           : "openid",
    tenant_domain   : "",
    type            : "confidential",
    allowed_origins : ["localhost"],
    id_token_ttl    : 900,
    code_ttl        : 600
  },  
  {
    client_id       : "test-client-id",
    name            : "Confdential Local Test Client",
    client_secret   : "test-client-secret",
    redirect_uris   : ["http://127.0.0.1:9000/cb"], 
    scope           : "openid",
    tenant_domain   : "",
    type            : "confidential",
    allowed_origins : ["localhost"],
    id_token_ttl    : 900,
    code_ttl        : 600
  }
];

module.exports = { 
  findClient(client_id) {
    console.log(`findClient(${client_id})`);
    return new Promise( (resolve, reject) => {
      let client = clients.find( (el) => el.client_id == client_id);
      resolve(client)
    });
  },
  upsertClient(client) {},
  deleteClient(client) {}
};