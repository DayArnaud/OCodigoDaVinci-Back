require("dotenv").config();
const sslSetting = process.env.USE_SSL === "true" ? { ssl: true } : {};

const knex = require("knex")({
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    ...sslSetting,
  },
});

module.exports = knex;
