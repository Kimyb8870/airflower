"use strict";

const mariadb = require("mariadb");

const ctrl = require("./database.ctrl");

const pool = mariadb.createPool({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PW,
  database: process.env.DATABASE_NAME,
});

const startDatabaseConnection = async () => {
  try {
    const conn = await pool.getConnection();
    if (conn.isValid()) {
      console.log("database connected");
      console.log({
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PW,
        database: process.env.DATABASE_NAME,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  startDatabaseConnection,
};
