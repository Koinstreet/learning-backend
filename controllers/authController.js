const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { CREATED, UNAUTHORIZED, BAD_REQUEST, OK, FORBIDDEN } = require("http-status-codes");

// DB
const db = require("../DB/db");
const User = db.users;

// Validation
const { validateSignup, validateLogin } = require("../validators");

// Error
const AppError = require("../utils/appError");
// Success
const AppSuccess = require("../utils/successHandler");

const signToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

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
    const user = await User.findByPk(decoded.id);
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
    if(!roles.includes(req.user.role)) {
      const errors = {};
      errors.msg = "You do not have permission to perform this action";
      return next(AppError.validationError(res, FORBIDDEN, errors));
    }
    next();
  }
}

exports.signupUser = async (req, res, next) => {
  let { firstName, lastName, email, password, role } = req.body;
  try {
    const { errors, isValid } = validateSignup(req.body);
    if (!isValid) {
      return AppError.validationError(res, BAD_REQUEST, errors);
    }
    const user = await User.findOne({ where: { email } });
    if (user) {
      errors.msg = "User already Exists";
      return AppError.validationError(res, BAD_REQUEST, errors);
    }
    password = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
      role,
    });
    const token = signToken(newUser.id, newUser.role);

    res.status(201).json({
      status: CREATED,
      token,
      data: {
        user: newUser
      }
    });
    // return AppSuccess.successWithData(res, OK, token);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  const { errors, isValid } = validateLogin(req.body);
  if (!isValid) {
    return AppError.validationError(res, BAD_REQUEST, errors);
  }
  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      errors.msg = "Username or Password Incorrect";
      return AppError.validationError(res, UNAUTHORIZED, errors);
    }
    const token = signToken(user.id, user.role);
    res.status(201).json({
      status: OK,
      token,
      data: {
        user
      }
    });
    // return AppSuccess.successWithData(res, OK, token);
  } catch (err) {
    return AppError.validationError(res, err);
  }
};
