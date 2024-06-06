"use strict";

const handleRegisterAction = (req, res) => {
  console.log("handleRegisterAction");

  res.send("handlePostAction");
};

const handleCancelAction = (req, res) => {
  console.log("handleCancelAction");

  res.send("handleCancelAction");
};

const handleGetCodeList = (req, res) => {
  console.log("handleGetCodeList");

  res.send("handleGetCodeList");
};

const handleGetQueueList = (req, res) => {
  console.log("handleGetQueueList");

  res.send("handleGetQueueList");
};

module.exports = {
  handleRegisterAction,
  handleCancelAction,
  handleGetCodeList,
  handleGetQueueList,
};
