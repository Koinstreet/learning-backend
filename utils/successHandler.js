class AppSuccess {
  static getStatus(statusCode) {
    return `${statusCode}`.startsWith("2") ? "success" : "error";
  }
  static successNoData(res, statusCode, message) {
    return res.status(statusCode).json({
      status: this.getStatus(statusCode),
      message,
    });
  }
  static successWithData(res, statusCode, data) {
    return res.status(statusCode).json({
      status: this.getStatus(statusCode),
      data: {
        data,
      },
    });
  }
}

module.exports = AppSuccess;
