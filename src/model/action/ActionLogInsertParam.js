class ActionLogInsertParam {
  constructor(
    mode,
    actionType,
    controllerId,
    actionDatetime,
    requestDatetime,
    humid,
    temp
  ) {
    this.mode = mode;
    this.actionType = actionType;
    this.controllerId = controllerId;
    this.actionDatetime = actionDatetime;
    this.requestDatetime = requestDatetime;
    this.humid = humid;
    this.temp = temp;
  }

  getParam() {
    return {
      MODE: this.mode,
      ACTION_TYPE: this.actionType,
      CONTROLLER_ID: this.controllerId,
      ACTION_DATETIME: this.actionDatetime,
      REQUEST_DATETIME: this.requestDatetime,
      HUMID: this.humid,
      TEMP: this.temp,
    };
  }
}

module.exports = ActionLogInsertParam;
