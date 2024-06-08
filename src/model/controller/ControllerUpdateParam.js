class ControllerUpdateParam {
  constructor(id, ip) {
    this.id = id;
    this.ip = ip;
  }

  getParam() {
    return {
      CONTROLLER_ID: this.id,
      CONTROLLER_IP: this.ip,
    };
  }
}
module.exports = ControllerUpdateParam;
