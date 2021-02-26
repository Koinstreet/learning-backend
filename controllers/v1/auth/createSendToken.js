const jwt = require("jsonwebtoken");

const { successWithData } = require("../../../utils/successHandler");

const signToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res, message) => {
  const token = signToken(user._id);
  const data = {
    token,
    user,
  };
  return successWithData(res, statusCode, message, data);
};

module.exports = createSendToken;
