"use strict";
const { systemDB } = require("../../database/database");
const { ApiResponse } = require("../../model/general");
const CurrentSystemUpdateParam = require("../../model/system/CurrentSystemUpdateParam");
const SystemModeUpdateParam = require("../../model/system/SystemModeUpdateParam");
const { updateModel, predictAction } = require("./system.ai.js");

const MODE_INFO = {
  intervalId: null,
  COOL_MODE: 2,
  NO_HUMID: 3,
  HOT_MODE: 4,
};

const startAIInterval = async () => {
  // 최초 1회 인공지능 예측 실행
  const sqlResult = await systemDB.selectCurrentSystem();
  if (sqlResult.isSuccess()) {
    const { CURRENT_TEMP, CURRENT_HUMID } = sqlResult.getData();
    const datetime = new Date().toISOString();
    const action = await predictAction(datetime, CURRENT_TEMP, CURRENT_HUMID);
    console.log(`Initial predicted action: ${action}`);
    // 여기에 에어컨 제어 로직 추가 (예: 실제 에어컨 제어 API 호출)
  }

  // 이후 주기적으로 인공지능 예측 실행
  MODE_INFO.intervalId = setInterval(async () => {
    const sqlResult = await systemDB.selectCurrentSystem();
    if (sqlResult.isSuccess()) {
      const { CURRENT_TEMP, CURRENT_HUMID } = sqlResult.getData();
      const datetime = new Date().toISOString();
      const action = await predictAction(datetime, CURRENT_TEMP, CURRENT_HUMID);
      console.log(`Predicted action: ${action}`);
      // 여기에 에어컨 제어 로직 추가 (예: 실제 에어컨 제어 API 호출)
    }
  }, 1000 * 60 * process.env.AI_INTERVAL); // 10분 간격으로 실행
};

const clearAIInterval = () => {
  clearInterval(MODE_INFO.intervalId);
};

// 초기화 시 현재 모드 로드 및 학습 데이터 업데이트
(async () => {
  const modeInfo = await systemDB.selectCurrentSystem();
  const { CURRENT_MODE } = modeInfo.getData();

  if ([0, 2, 3].includes(CURRENT_MODE)) {
    await performUpdateModel();
  } else if (CURRENT_MODE === 1) {
    startAIInterval();
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
      await performUpdateModel();
      break;
    }
    case 1: {
      console.log("A.I Mode");
      startAIInterval();
      break;
    }
    case 2: {
      clearAIInterval();
      console.log("Preset Mode");
      await performUpdateModel();
      break;
    }
    case 3: {
      clearAIInterval();
      console.log("Manual Mode");
      await performUpdateModel();
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

const fetchTrainingData = async (callback) => {
  const sqlResult = await systemDB.selectAILearningDataset();

  if (!sqlResult.isSuccess()) {
    console.error("Failed to fetch training data");
    return;
  }

  const { inputDataset, labelDataset } = sqlResult.getData();

  const inputs = inputDataset;
  const labels = labelDataset.map((ACTION_TYPE) => {
    if (ACTION_TYPE === MODE_INFO.COOL_MODE) return [1, 0, 0];
    if (ACTION_TYPE === MODE_INFO.NO_HUMID) return [0, 1, 0];
    if (ACTION_TYPE === MODE_INFO.HOT_MODE) return [0, 0, 1];
  });

  callback(inputs, labels);
};

// 모드에 따른 모델 업데이트
const performUpdateModel = async () => {
  fetchTrainingData(async (inputs, labels) => {
    await updateModel(inputs, labels);
  });
};

module.exports = {
  handleUpdateMode,
  handleGetCurrent,
  handleUpdateCurrent,
  performUpdateModel,
};
