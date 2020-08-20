const { INTERNAL_SERVER_ERROR, BAD_REQUEST } = require("http-status-codes");

class AppError {
  static getStatus(statusCode) {
    return `${statusCode}`.startsWith("4") ? "fail" : "error";
  }

  static validationError(res, statusCode, message) {
    return res.status(statusCode).json({
      status: this.getStatus(statusCode),
      data: {
        message,
      },
    });
  }
  static handleError(res, message) {
    return res.status(BAD_REQUEST).json({
      status: "error",
      message: message,
    });
  }
  static tryCatchError(res, error) {
    console.error(error);
    return res.status(INTERNAL_SERVER_ERROR).json({
      status: this.getStatus(INTERNAL_SERVER_ERROR),
      message: error.message,
    });
  }
}

module.exports = AppError;
