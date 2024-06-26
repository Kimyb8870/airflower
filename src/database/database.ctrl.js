const moment = require("moment-timezone");
const { SqlResult } = require("../model/general");
const util = require("./database.util");

// System

const updateSystemMode = async (pool, SystemModeUpdateParam) => {
  const { MODE } = SystemModeUpdateParam.getParam();
  const sql = `UPDATE TB_SYSTEM_CURRENT SET CURRENT_MODE = '${MODE}', CURRENT_DATETIME=NOW() WHERE ID = "1"`;
  let result = null;

  try {
    console.log(`[Datbase] - System : updateSystemMode`);
    const updateSqlResult = await pool.query(sql);
    if (updateSqlResult.constructor.name === "OkPacket") {
      result = new SqlResult(true);
    }
  } catch (e) {
    console.error(e.message);
    result = new SqlResult(false);
  } finally {
    console.log(result);
    return result;
  }
};

const selectCurrentSystem = async (pool) => {
  const sql = `SELECT CURRENT_MODE, CURRENT_DATETIME, CURRENT_TEMP, CURRENT_HUMID FROM TB_SYSTEM_CURRENT WHERE ID = "1";`;
  let result = null;

  try {
    console.log(`[Datbase] - System : selectCurrentSystem`);
    const selectSqlResult = await pool.query(sql);

    // 시간값 한국시간대로 변경
    const utcTime = selectSqlResult[0].CURRENT_DATETIME;
    const currentMode = {
      ...selectSqlResult[0],
      CURRENT_DATETIME: util.formatUtcTimeOfKorea(utcTime),
    };

    result = new SqlResult(true, "", currentMode);
  } catch (e) {
    console.error(e.message);
    result = new SqlResult(false);
  } finally {
    console.log(result);
    return result;
  }
};

const updateCurrentSystem = async (pool, CurrentSystemUpdateParam) => {
  const { CURRENT_TEMP, CURRENT_HUMID } = CurrentSystemUpdateParam.getParam();
  const sql = `UPDATE TB_SYSTEM_CURRENT SET CURRENT_TEMP = "${CURRENT_TEMP}", CURRENT_HUMID = "${CURRENT_HUMID}", CURRENT_DATETIME = NOW() WHERE ID = "1"`;
  let result = null;

  try {
    console.log(`[Datbase] - System : updateCurrentSystem`);
    const updateSqlResult = await pool.query(sql);
    if (updateSqlResult.constructor.name === "OkPacket") {
      result = new SqlResult(true);
    }
  } catch (e) {
    console.error(e.message);
    result = new SqlResult(false);
  } finally {
    console.log(result);
    return result;
  }
};

const selectAILearningDataset = async (pool) => {
  const LIMIT_COUNT = 100;
  const sql = `SELECT REQUEST_DATETIME, HUMID, TEMP, ACTION_TYPE FROM TB_ACTION_LOG ORDER BY REQUEST_DATETIME DESC LIMIT ${LIMIT_COUNT}`;

  let result = null;

  try {
    console.log(`[Datbase] - System : selectAILearningDataset`);
    const selectSqlResult = await pool.query(sql);

    // 시간값 한국시간대로 변경
    const inputDataset = selectSqlResult.map((row) => [
      new Date(util.formatUtcTimeOfKorea(row.REQUEST_DATETIME)).getTime(),
      row.HUMID,
      row.TEMP,
    ]);

    const labelDataset = selectSqlResult.map((row) => row.ACTION_TYPE);

    result = new SqlResult(true, "", { inputDataset, labelDataset });
  } catch (e) {
    console.error(e.message);
    result = new SqlResult(false);
  } finally {
    console.log(result);
    return result;
  }
};

// Action

const insertAction = async (pool, ActionInsertParam) => {
  const {
    ACTION_ID,
    SCHEDULE_ID,
    ACTION_TYPE,
    CONTROLLER_ID,
    REQUEST_DATETIME,
  } = ActionInsertParam.getParam();

  const sql = `INSERT INTO TB_ACTION_QUEUE (ACTION_ID, SCHEDULE_ID, ACTION_TYPE, CONTROLLER_ID, ACTION_DATETIME, REQUEST_DATETIME) VALUES("${ACTION_ID}", "${SCHEDULE_ID}", "${ACTION_TYPE}", "${CONTROLLER_ID}", NOW(), "${REQUEST_DATETIME}");`;
  let result = null;

  try {
    console.log(`[Datbase] - System : insertAction`);
    const insertSqlResult = await pool.query(sql);
    if (insertSqlResult.constructor.name === "OkPacket") {
      result = new SqlResult(true);
    }
  } catch (e) {
    console.error(e.message);
    result = new SqlResult(false);
  } finally {
    console.log(result);
    return result;
  }
};

const insertActionList = async (pool, ActionInsertListParam) => {
  const sql = ActionInsertListParam.generateInsertSQL();
  let result = null;

  try {
    console.log(`[Datbase] - System : insertActionList`);
    const insertSqlResult = await pool.query(sql);
    if (
      insertSqlResult.constructor.name === "OkPacket" &&
      insertSqlResult.affectedRows === ActionInsertListParam.getLength()
    ) {
      result = new SqlResult(true);
    }
  } catch (e) {
    console.error(e.message);
    result = new SqlResult(false);
  } finally {
    console.log(result);
    return result;
  }
};

const deleteAction = async (pool, ActionDeleteParam) => {
  const { ACTION_ID } = ActionDeleteParam.getParam();
  const sql = `DELETE FROM TB_ACTION_QUEUE WHERE ACTION_ID = "${ACTION_ID}";`;
  let result = null;

  try {
    console.log(`[Datbase] - System : deleteAction`);
    const deleteSqlResult = await pool.query(sql);
    if (
      deleteSqlResult.constructor.name === "OkPacket" &&
      deleteSqlResult.affectedRows === 1
    ) {
      result = new SqlResult(true);
    } else {
      result = new SqlResult(false, "no matching ACTION_ID");
    }
  } catch (e) {
    console.error(e.message);
    result = new SqlResult(false);
  } finally {
    console.log(result);
    return result;
  }
};

const selectActionCodeList = async (pool) => {
  const sql = `SELECT * FROM TB_ACTION_CODE;`;
  let result = null;

  try {
    console.log(`[Datbase] - System : selectActionCodeList`);
    const selectSqlResult = await pool.query(sql);
    result = new SqlResult(true, "", selectSqlResult);
  } catch (e) {
    console.error(e.message);
    result = new SqlResult(false);
  } finally {
    console.log(result);
    return result;
  }
};

const selectActionQueueList = async (pool) => {
  const sql = `SELECT * FROM TB_ACTION_QUEUE;`;
  let result = null;

  try {
    console.log(`[Datbase] - System : selectActionQueueList`);
    const selectSqlResult = await pool.query(sql);
    result = new SqlResult(true, "", selectSqlResult);
  } catch (e) {
    console.error(e.message);
    result = new SqlResult(false);
  } finally {
    console.log(result);
    return result;
  }
};

const selectActionQueueItemById = async (pool, ActionIdParam) => {
  const { ACTION_ID } = ActionIdParam.getParam();
  let result = null;
  const sql = `SELECT * FROM TB_ACTION_QUEUE WHERE ACTION_ID = "${ACTION_ID}"`;

  try {
    console.log(`[Datbase] - System : selectActionQueueItemById`);
    const selectSqlResult = await pool.query(sql);

    if (selectSqlResult.length === 1) {
      let actionItem = selectSqlResult[0];
      const actionDatetimeUtc = actionItem.ACTION_DATETIME;
      const requestDatetimeUtc = actionItem.REQUEST_DATETIME;

      actionItem = {
        ...actionItem,
        ACTION_DATETIME: util.formatUtcTimeOfKorea(actionDatetimeUtc),
        REQUEST_DATETIME: util.formatUtcTimeOfKorea(requestDatetimeUtc),
      };

      result = new SqlResult(true, "", actionItem);
    } else if (selectSqlResult.length === 0) {
      result = new SqlResult(true, "no action item found", []);
    }
  } catch (e) {
    console.error(e.message);
    result = new SqlResult(false);
  } finally {
    console.log(result);
    return result;
  }
};

const insertActionLog = async (pool, ActionLogInsertParam) => {
  const {
    MODE,
    ACTION_TYPE,
    CONTROLLER_ID,
    ACTION_DATETIME,
    REQUEST_DATETIME,
    HUMID,
    TEMP,
  } = ActionLogInsertParam.getParam();

  const sql = `INSERT INTO TB_ACTION_LOG (MODE, ACTION_TYPE, CONTROLLER_ID, ACTION_DATETIME, REQUEST_DATETIME, HUMID, TEMP) VALUES("${MODE}", "${ACTION_TYPE}", "${CONTROLLER_ID}", "${ACTION_DATETIME}", "${REQUEST_DATETIME}", "${HUMID}", "${TEMP}");`;

  let result = null;

  try {
    console.log(`[Datbase] - System : insertActionLog`);
    const insertSqlResult = await pool.query(sql);
    if (insertSqlResult.constructor.name === "OkPacket") {
      result = new SqlResult(true);
    }
  } catch (e) {
    console.error(e.message);
    result = new SqlResult(false);
  } finally {
    console.log(result);
    return result;
  }
};

// Controller

const insertController = async (pool, ControllerInsertParam) => {
  const { CONTROLLER_ID, CONTROLLER_IP, CONTROLLER_NAME, CONTROLLER_POSITION } =
    ControllerInsertParam.getParam();
  let result = null;

  const sql = `INSERT INTO TB_CONTROLLER (CONTROLLER_ID, CONTROLLER_IP, CONTROLLER_NAME, CONTROLLER_POSITION, REGISTRATION_DATETIME, WAKEUP_DATETIME) 
  VALUES("${CONTROLLER_ID}", "${CONTROLLER_IP}", "${CONTROLLER_NAME}", "${CONTROLLER_POSITION}", NOW(), NOW());`;

  try {
    console.log(`[Datbase] - System : insertController`);
    const insertSqlResult = await pool.query(sql);
    if (insertSqlResult.constructor.name === "OkPacket") {
      result = new SqlResult(true);
    }
  } catch (e) {
    console.error(e.message);
    result = new SqlResult(false);
  } finally {
    console.log(result);
    return result;
  }
};

const updateController = async (pool, ControllerUpdateParam) => {
  const { CONTROLLER_ID, CONTROLLER_IP } = ControllerUpdateParam.getParam();
  const sql = `UPDATE TB_CONTROLLER SET CONTROLLER_IP = "${CONTROLLER_IP}", WAKEUP_DATETIME=NOW() WHERE CONTROLLER_ID = ${CONTROLLER_ID}`;
  let result = null;

  try {
    console.log(`[Datbase] - System : updateController`);
    const updateSqlResult = await pool.query(sql);
    if (updateSqlResult.constructor.name === "OkPacket") {
      result = new SqlResult(true);
    }
  } catch (e) {
    console.error(e.message);
    result = new SqlResult(false);
  } finally {
    console.log(result);
    return result;
  }
};

const deleteController = async (pool, ControllerDeleteParam) => {
  const { CONTROLLER_ID } = ControllerDeleteParam.getParam();
  const sql = `DELETE FROM TB_CONTROLLER WHERE CONTROLLER_ID = "${CONTROLLER_ID}"`;
  let result = null;

  try {
    console.log(`[Datbase] - System : deleteController`);
    const deleteSqlResult = await pool.query(sql);
    console.log(deleteSqlResult);
    if (
      deleteSqlResult.constructor.name === "OkPacket" &&
      deleteSqlResult.affectedRows === 1
    ) {
      result = new SqlResult(true);
    } else {
      result = new SqlResult(false);
    }
  } catch (e) {
    console.error(e.message);
    result = new SqlResult(false);
  } finally {
    console.log(result);
    return result;
  }
};

const selectControllerList = async (pool) => {};

const selectControllerWithId = async (pool, ControllerIdParam) => {
  const { CONTROLLER_ID } = ControllerIdParam.getParam();
  const sql = `SELECT * FROM TB_CONTROLLER WHERE CONTROLLER_ID  = "${CONTROLLER_ID}";`;
  let result = null;
  try {
    console.log(`[Datbase] - System : selectControllerWithId`);
    const selectSqlResult = await pool.query(sql);

    if (selectSqlResult.length === 1) {
      const controllerInfo = selectSqlResult[0];
      result = new SqlResult(true, "", controllerInfo);
    } else if (selectSqlResult.length === 0) {
      result = new SqlResult(false);
    }
  } catch (e) {
    console.error(e.message);
    result = new SqlResult(false);
  } finally {
    console.log(result);
    return result;
  }
};

module.exports = {
  //system
  updateSystemMode,
  selectCurrentSystem,
  updateCurrentSystem,
  selectAILearningDataset,

  // action
  // --deprecated--insertAction,
  insertActionList,
  deleteAction,
  selectActionCodeList,
  selectActionQueueList,
  selectActionQueueItemById,
  insertActionLog,

  //controller
  insertController,
  deleteController,
  updateController,
  selectControllerList,
  selectControllerWithId,
};
