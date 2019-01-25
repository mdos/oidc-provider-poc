// Convert to dotenv

module.exports = {
  SERVER_PORT: process.env.SERVER_PORT || 3000,
  CLIENT_SERVICE_URI: process.env.CLIENT_SERVICE_URI || 'http://localhost:3001/clients'
};
