class ControllerInsertParam {
  constructor(id, ip, name, position) {
    this.id = id;
    this.ip = ip;
    this.name = name;
    this.position = position;
  }

  getParam() {
    return {
      CONTROLLER_ID: this.id,
      CONTROLLER_IP: this.ip,
      CONTROLLER_NAME: this.name,
      CONTROLLER_POSITION: this.position,
    };
  }
}

module.exports = ControllerInsertParam;
