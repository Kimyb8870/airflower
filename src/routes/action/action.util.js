const ActionInsertParam = require("../../model/action/ActionInsertParam");
const { systemDB, actionDB } = require("../../database/database");
const ActionDeleteParam = require("../../model/action/ActionDeleteParam");
const ActionLogInsertParam = require("../../model/action/ActionLogInsertParam");
const ActionIdParam = require("../../model/action/ActionIdParam");

const minToMilisecond = (min) => min * 60 * 1000;

const requestActionToController = async (
  actionId,
  actionType,
  controllerIp
) => {
  console.log(`action Id: ${actionId}`);
  console.log(`action: ${actionType}`);
  console.log(`controller: ${controllerIp}`);

  console.log("get response from controller");

  //get action data from TB_ACTION_QUEUE
  const actionIdParam = new ActionIdParam(actionId);
  const actionQueueItem = await actionDB.selectActionQueueItemById(
    actionIdParam
  );
  const { ACTION_TYPE, ACTION_DATETIME, REQUEST_DATETIME } =
    actionQueueItem.getData();

  //get current MODE
  const selectCurrentSystemResult = await systemDB.selectCurrentSystem();
  const { CURRENT_MODE } = selectCurrentSystemResult.getData();

  const actionDeleteParam = new ActionDeleteParam(actionId);
  await actionDB.deleteAction(actionDeleteParam);

  const CONTROLLER_ID = 1;
  const actionLogInsertParam = new ActionLogInsertParam(
    CURRENT_MODE,
    ACTION_TYPE,
    CONTROLLER_ID,
    ACTION_DATETIME,
    REQUEST_DATETIME
  );

  await actionDB.insertActionLog(actionLogInsertParam);
};

const makeUniqueActionId = () => {
  let randomNumber = "";

  for (let i = 0; i < 10; i++) {
    const randomDigit = Math.floor(Math.random() * 10);
    randomNumber += randomDigit.toString();
  }

  return randomNumber;
};

const makeActionInsertParam = (ACTION_TYPE, TIMER, CONTROLLER_IP) => {
  // make random action id for match action queue row after callback finish
  const ACTION_ID = makeUniqueActionId();

  // register setTimeout
  const SCHEDULE_ID = setTimeout(() => {
    requestActionToController(ACTION_ID, ACTION_TYPE, CONTROLLER_IP);
  }, minToMilisecond(TIMER));

  return new ActionInsertParam(ACTION_ID, SCHEDULE_ID, ACTION_TYPE, TIMER);
};

module.exports = {
  minToMilisecond,
  requestActionToController,
  makeUniqueActionId,
  makeActionInsertParam,
};
