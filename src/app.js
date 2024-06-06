"use strict";

const express = require("express");
const app = express();
const cors = require("cors");

// Express: register middleware
app.use(
  cors({
    origin: "*",
  })
);

app.use("/action", require("./routes/action"));
app.use("/controller", require("./routes/controller"));
app.use("/system", require("./routes/system"));

module.exports = app;
