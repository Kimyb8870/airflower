"use strict";

const express = require("express");
const app = express();
const cors = require("cors");
const { startDatabaseConnection } = require("./database/database");

// Database: connect database
startDatabaseConnection();

// Express: register middleware
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json({ extended: true }));

// Express: register routes
app.use("/action", require("./routes/action"));
app.use("/controller", require("./routes/controller"));
app.use("/system", require("./routes/system"));

module.exports = app;
