class ActionLogInsertParam {
  constructor(mode, actionType, controllerId, actionDatetime, requestDatetime) {
    this.mode = mode;
    this.actionType = actionType;
    this.controllerId = controllerId;
    this.actionDatetime = actionDatetime;
    this.requestDatetime = requestDatetime;
  }

  getParam() {
    return {
      MODE: this.mode,
      ACTION_TYPE: this.actionType,
      CONTROLLER_ID: this.controllerId,
      ACTION_DATETIME: this.actionDatetime,
      REQUEST_DATETIME: this.requestDatetime,
    };
  }
}

module.exports = ActionLogInsertParam;
