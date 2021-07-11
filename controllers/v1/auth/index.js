const { promisify } = require("util");
const jwt = require("jsonwebtoken");

import sendEmail from '../../../utils/email/emailService';
import emailTemplate from '../../../utils/email/sendEmail';

const { UNAUTHORIZED, BAD_REQUEST } = require("http-status-codes");

// DB
const User = require("../../../model/v1/User");

// Validation
const { validateSignup, validateLogin } = require("../../../validators");

// Error
const AppError = require("../../../utils/appError");

const createSendToken = require("./createSendToken");


exports.signupUser = async (req, res, next) => {
  try {
    const { errors, isValid } = validateSignup(req.body);
    console.log(errors, isValid);
    if (!isValid) {
      return AppError.validationError(res, BAD_REQUEST, errors);
    }
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      errors.msg = "User already Exists";
      return AppError.validationError(res, BAD_REQUEST, errors);
    }
    const newUser = await User.create({ ...req.body });

    // const subject = 'MPA Account Successfuly created!';
    // sendEmail(emailTemplate(newUser.firstName), subject, newUser.email);
    const message = `Dear ${newUser.firstName} , Successfully Registered your account! login with your email and password`;
    createSendToken(newUser, 201, res, message);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.loginUser = async (req, res, next) => {
  const { errors, isValid } = validateLogin(req.body);
  if (!isValid) {
    return AppError.validationError(res, BAD_REQUEST, errors);
  }
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");

    if(!user){
      errors.msg = "Email is Incorrect";
      return AppError.validationError(res, UNAUTHORIZED, errors);
    }
    if (!(await user.correctPassword(password, user.password))) {
      errors.msg = "Password Incorrect";
      return AppError.validationError(res, UNAUTHORIZED, errors);
    }
    createSendToken(user, 201, res, "User Authorized");
  } catch (err) {
    return AppError.validationError(res, err);
  }
};
