const { promisify } = require("util");
const jwt = require("jsonwebtoken");

const { UNAUTHORIZED, BAD_REQUEST } = require("http-status-codes");

// DB
const User = require("../../model/v1/User");

// Error
const AppError = require("../../utils/appError");


// AUTHENTICATION

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return next(AppError.validationError(res, UNAUTHORIZED, "Unauthorized"));
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(AppError.validationError(res, UNAUTHORIZED, "Unauthorized"));
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    console.log(err);
    return next(AppError.tryCatchError(res, err));
  }
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      const errors = {};
      errors.msg = "You do not have permission to perform this action";
      return next(AppError.validationError(res, UNAUTHORIZED, errors.msg));
    }
    next();
  };
};
