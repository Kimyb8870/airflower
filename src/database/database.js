"use strict";

const mariadb = require("mariadb");

const ctrl = require("./database.ctrl");

const pool = mariadb.createPool({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PW,
  database: process.env.DATABASE_NAME,
  timezone: "Asia/Seoul",
});

const startDatabaseConnection = async () => {
  try {
    const conn = await pool.getConnection();
    if (conn.isValid()) {
      console.log("database connected");
      console.log({
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PW,
        database: process.env.DATABASE_NAME,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

// System

const updateSystemMode = async (SystemModeUpdateParam) =>
  await ctrl.updateSystemMode(pool, SystemModeUpdateParam);

const selectCurrentSystem = async () => await ctrl.selectCurrentSystem(pool);

const updateCurrentSystem = async (CurrentSystemUpdateParam) =>
  await ctrl.updateCurrentSystem(pool, CurrentSystemUpdateParam);

// Action

// const insertAction = async (ActionInsertParam) =>
//   await ctrl.insertAction(pool, ActionInsertParam);

const insertActionList = async (ActionInsertListParam) =>
  await ctrl.insertActionList(pool, ActionInsertListParam);

const deleteAction = async (ActionDeleteParam) =>
  await ctrl.deleteAction(pool, ActionDeleteParam);

const selectActionCodeList = async () => await ctrl.selectActionCodeList(pool);

const selectActionQueueList = async () =>
  await ctrl.selectActionQueueList(pool);

const selectActionQueueItemById = async (ActionIdParam) =>
  await ctrl.selectActionQueueItemById(pool, ActionIdParam);

const insertActionLog = async (ActionLogParam) =>
  await ctrl.insertActionLog(pool, ActionLogParam);

// Controller

const selectControllerWithId = async (ControllerIdParam) =>
  await ctrl.selectControllerWithId(pool, ControllerIdParam);

const insertController = async (ControllerInsertParam) =>
  await ctrl.insertController(pool, ControllerInsertParam);

const updateController = async (ControllerUpdateParam) =>
  await ctrl.updateController(pool, ControllerUpdateParam);

const deleteController = async (ControllerDeleteParam) =>
  await ctrl.deleteController(pool, ControllerDeleteParam);

module.exports = {
  startDatabaseConnection,
  systemDB: {
    updateSystemMode,
    selectCurrentSystem,
    updateCurrentSystem,
  },
  actionDB: {
    // insertAction,
    insertActionList,
    deleteAction,
    selectActionQueueItemById,
    selectActionCodeList,
    selectActionQueueList,
    insertActionLog,
  },
  controllerDB: {
    selectControllerWithId,
    insertController,
    updateController,
    deleteController,
  },
};
