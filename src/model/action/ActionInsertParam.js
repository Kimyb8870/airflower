class ActionInsertParam {
  constructor(actionId, scheduleId, actionType, timer) {
    this.actionId = actionId;
    this.scheduleId = scheduleId;
    this.actionType = actionType;
    this.timer = timer;
    this.controllerId = 1;
    this.actionDatetime = null;
    this.requestDatetime = null;
  }

  getParam() {
    return {
      ACTION_ID: this.actionId,
      SCHEDULE_ID: this.scheduleId,
      ACTION_TYPE: this.actionType,
      CONTROLLER_ID: this.controllerId,
      TIMER: this.timer,
    };
  }
}

module.exports = ActionInsertParam;
