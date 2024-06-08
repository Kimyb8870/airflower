class CurrentSystemUpdateParam {
  constructor(temp, humid) {
    this.temp = temp;
    this.humid = humid;
  }

  getParam() {
    return {
      CURRENT_TEMP: this.temp,
      CURRENT_HUMID: this.humid,
    };
  }
}

module.exports = CurrentSystemUpdateParam;
