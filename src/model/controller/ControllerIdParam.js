class ControllerIdParam {
  constructor(controllerId) {
    this.controllerId = controllerId;
  }

  getParam() {
    return {
      CONTROLLER_ID: this.controllerId,
    };
  }
}

module.exports = ControllerIdParam;
