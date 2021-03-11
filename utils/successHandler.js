const successHandler = {
  successNoData(res, statusCode, message) {
    return res.status(statusCode).json({ message, status: "success" });
  },
  successNoMessage(res, statusCode, data) {
    return res.status(statusCode).json({ data, status: "success" });
  },
  successWithData(res, statusCode, message, data) {
    return res.status(statusCode).json({
      message,
      status: "success",
      data,
    });
  },
};

module.exports = successHandler;
