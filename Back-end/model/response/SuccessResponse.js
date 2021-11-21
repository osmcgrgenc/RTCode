module.exports = class SuccessResponse {
  constructor(statusCode, message, data) {
    this.code = statusCode;
    this.msg = message;
    this.records = data;
  }
};
