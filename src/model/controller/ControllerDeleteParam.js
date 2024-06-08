class ControllerDeleteParam {
  constructor(id) {
    this.id = id;
  }

  getParam() {
    return {
      CONTROLLER_ID: this.id,
    };
  }
}

module.exports = ControllerDeleteParam;
