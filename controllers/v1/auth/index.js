const { promisify } = require("util");
const jwt = require("jsonwebtoken");

import sendEmail from '../../../utils/email/sendEmail';
import emailTemplate from '../../../utils/email/emailService';
const { UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");

const {
  successWithData,
  successNoData,
} = require("../../../utils/successHandler");

// DB
const User = require("../../../model/v1/User");
const Notifications = require("../../../model/v1/notifications");

// Validation
const { validateSignup, validateLogin } = require("../../../validators");

// Error
const AppError = require("../../../utils/appError");

const createSendToken = require("./createSendToken");


exports.getAllUser= async (req, res, next) => {
  try {
    const users = await User.find({})
      .sort("-createdAt");
    return successWithData(res, OK, "Users fetched successfully", users);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

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

    const subject = 'MPA Account Successfuly created!';
    sendEmail(emailTemplate(newUser.firstName), subject, newUser.email);
    const newNotification = await Notifications.create({receiverId: newUser._id, title: subject, type: 'User', description: 'Please create your account profile'});
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
