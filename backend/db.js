const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_HOST_DEV,
  port: process.env.DB_PORT_DEV,
  user: process.env.DB_USERNAME_DEV,
  password: process.env.DB_PASSWORD_DEV,
  database: process.env.DB_DATABASE_DEV,
});

module.exports = db;
