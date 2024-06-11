"use strict";
const { systemDB } = require("../../database/database");
const { ApiResponse } = require("../../model/general");
const CurrentSystemUpdateParam = require("../../model/system/CurrentSystemUpdateParam");
const SystemModeUpdateParam = require("../../model/system/SystemModeUpdateParam");

const MODE_INFO = {
  intervalId: null,
};

const startAIInterval = () => {
  MODE_INFO.intervalId = setInterval(() => {
    console.log("interval activating");
  }, 1000);
};

const clearAIInterval = () => {
  clearInterval(MODE_INFO.intervalId);
};

// load current mode only for initialize MODE_INFO
(async () => {
  const modeInfo = await systemDB.selectCurrentSystem();
  const { CURRENT_MODE } = modeInfo.getData();

  switch (CURRENT_MODE) {
    case 1: {
      startAIInterval();
      break;
    }
    case (0, 2, 3): {
      break;
    }
  }
})();

const handleUpdateMode = async (req, res) => {
  const { MODE } = req.body;

  let apiResponse = null;

  const systemModeUpdateParam = new SystemModeUpdateParam(MODE);

  const sqlResult = await systemDB.updateSystemMode(systemModeUpdateParam);

  switch (MODE) {
    case 0: {
      clearAIInterval();
      console.log("Sleep Mode");
      break;
    }
    case 1: {
      const TEN_MIN = 1000;
      console.log("A.I Mode");
      startAIInterval();
      break;
    }
    case 2: {
      clearAIInterval();
      console.log("Preset Mode");
      break;
    }
    case 3: {
      clearAIInterval();
      console.log("Manual Mode");
      break;
    }
  }

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
