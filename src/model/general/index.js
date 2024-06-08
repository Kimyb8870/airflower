class SqlResult {
  constructor(status, message = "", data = null) {
    this.status = status;
    this.message = message;
    this.data = data;
  }
  isSuccess() {
    return this.status;
  }

  getMessage() {
    return this.message;
  }

  getData() {
    return this.data;
  }
}

class ApiResponse {
  constructor(isSuccess, data = null) {
    this.isSuccess = isSuccess;
    this.data = data;
  }
  getJsonResponse() {
    return {
      IS_SUCCESS: this.isSuccess,
      DATA: this.data,
    };
  }
}

module.exports = {
  SqlResult,
  ApiResponse,
};
