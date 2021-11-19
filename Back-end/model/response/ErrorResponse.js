module.exports = class ErrorResponse {
  constructor(statusCode, message, stack) {
    this.code = statusCode;
    this.msg = message;
    this.error = stack;
  }
};
