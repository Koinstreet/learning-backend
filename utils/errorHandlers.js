const { INTERNAL_SERVER_ERROR, BAD_REQUEST } = require("http-status-codes");

const errorHandler = {
  normalError(res, statusCode, message, data) {
    return res.status(statusCode).json({ message, data, status: "error" });
  },
  tryCatchError(res, error) {
    console.error(error);
    return res.status(INTERNAL_SERVER_ERROR).json({
      message: error.message,
      status: "error",
    });
  },
  validationError(res, message) {
    return res.status(BAD_REQUEST).json({ message, status: "error" });
  },
};

module.exports = errorHandler;
