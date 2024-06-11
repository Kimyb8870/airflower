"use strict";
const ActionDeleteParam = require("../../model/action/ActionDeleteParam");
const ControllerIdParam = require("../../model/controller/ControllerIdParam");
const { actionDB, controllerDB } = require("../../database/database");
const { ApiResponse } = require("../../model/general");
const util = require("./action.util");
const ActionInsertListParam = require("../../model/action/ActionInsertListParam");

const handleRegisterActionList = async (req, res) => {
  const { ACTION_LIST } = req.body;

  let apiResponse = null;

  // search controler ip from database
  // default controller is CONTROLLER_ID = 1
  const controllerIdParam = new ControllerIdParam(1);
  const selectSqlResult = await controllerDB.selectControllerWithId(
    controllerIdParam
  );
  if (!selectSqlResult.isSuccess()) {
    apiResponse = new ApiResponse(false, { MESSAGE: "no controller" });
    res.json(apiResponse.getJsonResponse());
    return;
  }

  const { CONTROLLER_IP } = selectSqlResult.getData();

  const actionInsertListParam = new ActionInsertListParam(
    ACTION_LIST.map(({ ACTION_TYPE, TIMER }) =>
      util.makeActionInsertParam(ACTION_TYPE, TIMER, CONTROLLER_IP)
    )
  );

  // insertActionQueue
  const insertSqlResult = await actionDB.insertActionList(
    actionInsertListParam
  );

  if (insertSqlResult.isSuccess()) {
    apiResponse = new ApiResponse(true);
  } else {
    apiResponse = new ApiResponse(false);
  }

  res.json(apiResponse.getJsonResponse());
};

const handleCancelAction = async (req, res) => {
  const { ACTION_ID } = req.body;

  let apiResponse = null;

  const actionDeleteParam = new ActionDeleteParam(ACTION_ID);

  const deleteSqlResult = await actionDB.deleteAction(actionDeleteParam);

  if (deleteSqlResult.isSuccess()) {
    apiResponse = new ApiResponse(true);
  } else {
    apiResponse = new ApiResponse(false);
  }

  res.json(apiResponse.getJsonResponse());
};

const handleGetCodeList = async (req, res) => {
  let apiResponse = null;

  const selectSqlResult = await actionDB.selectActionCodeList();

  if (selectSqlResult.isSuccess()) {
    apiResponse = new ApiResponse(true, selectSqlResult.getData());
  } else {
    apiResponse = new ApiResponse(false);
  }

  res.json(apiResponse.getJsonResponse());
};

const handleGetQueueList = async (req, res) => {
  let apiResponse = null;

  const selectSqlResult = await actionDB.selectActionQueueList();

  if (selectSqlResult.isSuccess()) {
    apiResponse = new ApiResponse(true, selectSqlResult.getData());
  } else {
    apiResponse = new ApiResponse(false);
  }

  res.json(apiResponse.getJsonResponse());
};

module.exports = {
  handleRegisterActionList,
  handleCancelAction,
  handleGetCodeList,
  handleGetQueueList,
};
