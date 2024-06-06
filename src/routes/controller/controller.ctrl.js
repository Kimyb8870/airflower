"use strict";

const handleRegisterController = (req, res) => {
  console.log("handleRegisterController");

  res.send("handleRegisterController");
};

const handleDeleteController = (req, res) => {
  console.log("handleDeleteAction");

  res.send("handleDeleteController");
};

const handleUpdateController = (req, res) => {
  console.log("handleUpdateController");

  res.send("handleUpdateController");
};

const handleGetController = (req, res) => {
  console.log("handleGetControllerList");

  res.send("handleGetControllerList");
};

module.exports = {
  handleRegisterController,
  handleDeleteController,
  handleUpdateController,
  handleGetController,
};
