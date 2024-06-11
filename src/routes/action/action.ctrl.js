"use strict";
const ActionInsertParam = require("../../model/action/ActionInsertParam");
const ActionDeleteParam = require("../../model/action/ActionDeleteParam");
const ControllerIdParam = require("../../model/controller/ControllerIdParam");
const { actionDB, controllerDB } = require("../../database/database");
const { ApiResponse } = require("../../model/general");
const util = require("./action.util");

const handleRegisterAction = async (req, res) => {
  const { ACTION_TYPE, TIMER } = req.body;

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

  // make random action id for match action queue row after callback finish
  const ACTION_ID = util.makeUniqueActionId();

  // register setTimeout
  const SCHEDULE_ID = setTimeout(() => {
    util.requestActionToController(ACTION_ID, ACTION_TYPE, CONTROLLER_IP);
  }, util.minToMilisecond(TIMER));

  const actionInsertParam = new ActionInsertParam(
    ACTION_ID,
    SCHEDULE_ID,
    ACTION_TYPE,
    TIMER
  );

  // insertActionQueue
  const insertSqlResult = await actionDB.insertAction(actionInsertParam);

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
  handleRegisterAction,
  handleCancelAction,
  handleGetCodeList,
  handleGetQueueList,
};
