"use strict";
const { systemDB } = require("../../database/database");
const { ApiResponse } = require("../../model/general");
const CurrentSystemUpdateParam = require("../../model/system/CurrentSystemUpdateParam");
const SystemModeUpdateParam = require("../../model/system/SystemModeUpdateParam");

const handleUpdateMode = async (req, res) => {
  const { MODE } = req.body;

  let apiResponse = null;

  const systemModeUpdateParam = new SystemModeUpdateParam(MODE);

  const sqlResult = await systemDB.updateSystemMode(systemModeUpdateParam);

  if (sqlResult.isSuccess()) {
    apiResponse = new ApiResponse(true);
  } else {
    apiResponse = new ApiResponse(false);
  }

  res.json(apiResponse.getJsonResponse());
};

const handleGetCurrent = async (req, res) => {
  let apiResponse = null;

  const sqlResult = await systemDB.selectCurrentSystem();

  if (sqlResult.isSuccess()) {
    apiResponse = new ApiResponse(true, sqlResult.getData());
  } else {
    apiResponse = new ApiResponse(false);
  }

  res.json(apiResponse.getJsonResponse());
};

const handleUpdateCurrent = async (req, res) => {
  const { TEMP, HUMID } = req.body;

  let apiResponse = null;

  const currentSystemUpdateParam = new CurrentSystemUpdateParam(TEMP, HUMID);

  const sqlResult = await systemDB.updateCurrentSystem(
    currentSystemUpdateParam
  );

  if (sqlResult.isSuccess()) {
    apiResponse = new ApiResponse(true);
  } else {
    apiResponse = new ApiResponse(false);
  }

  res.json(apiResponse.getJsonResponse());
};

module.exports = {
  handleUpdateMode,
  handleGetCurrent,
  handleUpdateCurrent,
};
