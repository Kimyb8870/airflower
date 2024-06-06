"use strict";

const handleUpdateMode = (req, res) => {
  console.log("handleUpdateMode");

  res.send("handleUpdateMode");
};
const handleGetCurrent = (req, res) => {
  console.log("handleGetCurrent");

  res.send("handleGetCurrent");
};
const handleUpdateCurrent = (req, res) => {
  console.log("handleUpdateCurrent");

  res.send("handleUpdateCurrent");
};

module.exports = {
  handleUpdateMode,
  handleGetCurrent,
  handleUpdateCurrent,
};
