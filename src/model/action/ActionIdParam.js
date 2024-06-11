class ActionIdParam {
  constructor(actionId) {
    this.actionId = actionId;
  }
  getParam() {
    return {
      ACTION_ID: this.actionId,
    };
  }
}

module.exports = ActionIdParam;
