require('dotenv').config();

const env = process.env;

const config = {
  db: {
    host: env.DB_HOST || "remotemysql.com",
    user: env.DB_USER || "2ZE90yGC6G",
    password: env.DB_PASSWORD || "JZFqXibSmX",
    database: env.DB_NAME || "2ZE90yGC6G",
    waitForConnections: true,
    connectionLimit: env.DB_CONN_LIMIT || 2,
    queueLimit: 0,
    debug: env.DB_DEBUG || false,
  },
  listPerPage: env.LIST_PER_PAGE || 10,
};

module.exports = config;
