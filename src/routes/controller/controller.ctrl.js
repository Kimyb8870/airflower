"use strict";
const { controllerDB } = require("../../database/database");
const { ApiResponse } = require("../../model/general");
const ControllerIdParam = require("../../model/controller/ControllerIdParam");
const ControllerInsertParam = require("../../model/controller/ControllerInsertParam");
const ControllerUpdateParam = require("../../model/controller/ControllerUpdateParam");
const ControllerDeleteParam = require("../../model/controller/ControllerDeleteParam");

const handleRegisterController = async (req, res) => {
  const { CONTROLLER_ID = 1, CONTROLLER_NAME, CONTROLLER_POSITION } = req.body;

  let apiResponse = null;

  //check if controller registered
  const controllerIdParam = new ControllerIdParam(CONTROLLER_ID);

  const selectSqlResult = await controllerDB.selectControllerWithId(
    controllerIdParam
  );

  switch (selectSqlResult.isSuccess()) {
    case true: {
      //update existing controller
      const CONTROLLER_ID = 1;
      const CONTROLLER_IP = req.ip.split(":").at(-1);
      const controllerUpdateParam = new ControllerUpdateParam(
        CONTROLLER_ID,
        CONTROLLER_IP
      );

      const updateSqlResult = await controllerDB.updateController(
        controllerUpdateParam
      );

      if (updateSqlResult.isSuccess()) {
        apiResponse = new ApiResponse(true);
      } else {
        apiResponse = new ApiResponse(false);
      }
      break;
    }
    case false: {
      //register new controller
      //컨트롤러는 1개만 동작시킬 예정이므로 항상 ID 가 1로 등록되도록 설정
      const CONTROLLER_ID = 1;
      const CONTROLLER_IP = req.ip.split(":").at(-1);
      const controllerInsertParam = new ControllerInsertParam(
        CONTROLLER_ID,
        CONTROLLER_IP,
        CONTROLLER_NAME,
        CONTROLLER_POSITION
      );

      const insertSqlResult = await controllerDB.insertController(
        controllerInsertParam
      );

      if (insertSqlResult.isSuccess()) {
        apiResponse = new ApiResponse(true);
      } else {
        apiResponse = new ApiResponse(false);
      }
      break;
    }
  }

  res.json(apiResponse.getJsonResponse());
};

const handleDeleteController = async (req, res) => {
  let apiResponse = null;

  const CONTROLLER_ID = 1;
  const controllerDeleteParam = new ControllerDeleteParam(CONTROLLER_ID);

  const sqlResult = await controllerDB.deleteController(controllerDeleteParam);

  if (sqlResult.isSuccess()) {
    apiResponse = new ApiResponse(true);
  } else {
    apiResponse = new ApiResponse(false);
  }

  res.json(apiResponse.getJsonResponse());
};

// const handleUpdateController = (req, res) => {
//   console.log("handleUpdateController");

//   res.send("handleUpdateController");
// };

// const handleGetController = (req, res) => {
//   console.log("handleGetControllerList");

//   res.send("handleGetControllerList");
// };

module.exports = {
  handleRegisterController,
  handleDeleteController,
  // handleUpdateController,
  // handleGetController,
};
