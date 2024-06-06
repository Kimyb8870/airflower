"use strict";

require("dotenv").config();
const app = require("./app");

//Express: run server
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server On Port:${PORT}`);
});
