// Convert to dotenv

module.exports = {
    SERVER_PORT:    process.env.SERVER_PORT || 3001,
    DB_URL:         process.env.DB_URL || 'mongo://localhost:27017'
};
