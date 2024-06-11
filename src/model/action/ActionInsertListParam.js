class ActionInsertListParam {
  constructor(actionInsertParams) {
    this.actionInsertParams = actionInsertParams;
  }

  getLength() {
    return this.actionInsertParams.length;
  }

  generateInsertSQL() {
    if (this.actionInsertParams.length === 0) return "";

    const values = this.actionInsertParams
      .map((action) => {
        const param = action.getParam();
        return `("${param.ACTION_ID}", "${param.SCHEDULE_ID}", "${param.ACTION_TYPE}", "${param.CONTROLLER_ID}", NOW(), "${param.REQUEST_DATETIME}")`;
      })
      .join(", ");

    return `INSERT INTO TB_ACTION_QUEUE (ACTION_ID, SCHEDULE_ID, ACTION_TYPE, CONTROLLER_ID, ACTION_DATETIME, REQUEST_DATETIME) VALUES ${values};`;
  }
}

module.exports = ActionInsertListParam;
