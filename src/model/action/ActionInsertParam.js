class ActionInsertParam {
  constructor(actionId, scheduleId, actionType, timer) {
    this.actionId = actionId;
    this.scheduleId = scheduleId;
    this.actionType = actionType;
    this.controllerId = 1;
    this.requestDatetime = this.calculateRequestDatetime(timer);
  }

  calculateRequestDatetime(min) {
    const currentDatetime = new Date();

    currentDatetime.setMinutes(currentDatetime.getMinutes() + min);

    const year = currentDatetime.getFullYear();
    const month = String(currentDatetime.getMonth() + 1).padStart(2, "0");
    const day = String(currentDatetime.getDate()).padStart(2, "0");
    const hours = String(currentDatetime.getHours()).padStart(2, "0");
    const minutes = String(currentDatetime.getMinutes()).padStart(2, "0");
    const seconds = String(currentDatetime.getSeconds()).padStart(2, "0");

    const formattedDatetime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return formattedDatetime;
  }

  getParam() {
    return {
      ACTION_ID: this.actionId,
      SCHEDULE_ID: this.scheduleId,
      ACTION_TYPE: this.actionType,
      CONTROLLER_ID: this.controllerId,
      REQUEST_DATETIME: this.requestDatetime,
    };
  }
}

module.exports = ActionInsertParam;
