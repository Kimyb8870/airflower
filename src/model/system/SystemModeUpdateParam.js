class SystemModeUpdateParam {
  constructor(mode) {
    this.mode = mode;
  }

  getParam() {
    return {
      MODE: this.mode,
    };
  }
}

module.exports = SystemModeUpdateParam;
