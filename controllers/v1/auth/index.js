const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
import { recoverPersonalSignature } from "eth-sig-util";
import { bufferToHex } from "ethereumjs-util";

import sendEmail from "../../../utils/email/sendEmail";
import emailTemplate from "../../../utils/email/emailService";
const { UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");

import Token from "../../../model/v1/Token";

const {
  successWithData,
  successNoData
} = require("../../../utils/successHandler");

import emailFormatForgot from "../../../utils/email/forgotPassword/email";

// DB
const User = require("../../../model/v1/User");
const Notifications = require("../../../model/v1/notifications");

// Validation
const {
  validateSignup,
  validateLogin,
  validateForgotPassword,
  validateResetPassword
} = require("../../../validators");

// Error
const AppError = require("../../../utils/appError");

const createSendToken = require("./createSendToken");

exports.getAllUser = async (req, res, next) => {
  try {
    const users = await User.find({}).sort("-createdAt");
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

    const subject = "MPA Account Successfuly created!";
    sendEmail(emailTemplate(newUser.firstName), subject, newUser.email);
    const newNotification = await Notifications.create({
      receiverId: newUser._id,
      title: subject,
      type: "User",
      description: "Please create your account profile"
    });
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

    if (!user) {
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

exports.forgotPassword = async (req, res, next) => {
  try {
    const { errors, isValid } = validateForgotPassword(req.body);
    // if (!isValid) {
    //   return AppError.validationError(res, BAD_REQUEST, errors);
    // }

    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(400).send("user with given email doesn't exist");

    let token = await Token.findOne({ userId: user._id });
    if (!token) {
      token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex")
      }).save();
    }

    const link = `https://minorityprogrammers.com/reset?userId=${user._id}&&token=${token.token}`;
    const subject = "Link to Reset your password!";
    sendEmail(emailFormatForgot(user.firstName, link), subject, user.email);

    return successNoData(
      res,
      OK,
      "password reset link sent to your email account"
    );
  } catch (error) {
    res.send("An error occured");
    console.log(error);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { errors, isValid } = validateResetPassword(req.body);
    // if (!isValid) {
    //   return AppError.validationError(res, BAD_REQUEST, errors);
    // }

    const user = await User.findById(req.params.userId);
    if (!user) return res.status(400).send("invalid link or expired");

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token
    });
    if (!token) return res.status(400).send("Invalid link or expired");

    user.password = req.body.password;
    await user.save();
    await token.delete();

    return successNoData(res, OK, "User Password Resetted successfully");
  } catch (error) {
    res.send("An error occured");
    console.log(error);
  }
};

export const walletLogin = (req, res, next) => {
  const { signature, publicAddress } = req.body;
  if (!signature || !publicAddress)
    return res
      .status(400)
      .send({ error: "Request should have signature and publicAddress" });

  return User.findOne({ publicAddress })
    .then(user => {
      if (!user) {
        res.status(401).send({
          error: `User with publicAddress ${publicAddress} is not found in database`
        });

        return null;
      }

      return user;
    })
    .then(user => {
      if (!user) {
        throw new Error('User is not defined in "Verify digital signature".');
      }

      const msg = `I am signing my one-time nonce: ${user.nonce}`;

      const msgBufferHex = bufferToHex(Buffer.from(msg, "utf8"));
      const address = recoverPersonalSignature({
        data: msgBufferHex,
        sig: signature
      });

      if (address.toLowerCase() === publicAddress.toLowerCase()) {
        return user;
      } else {
        res.status(401).send({
          error: "Signature verification failed"
        });

        return null;
      }
    })
    .then(user => {
      if (!user) {
        throw new Error(
          'User is not defined in "Generate a new nonce for the user".'
        );
      }

      user.nonce = Math.floor(Math.random() * 10000);
      return user.save();
    })
    .then(user => {
      const message = `user Authorized`;
      createSendToken(user, 201, res, message);
    })
    .catch(next);
};

export const createWallet = (req, res, next) =>
  User.create(req.body)
    .then(user => res.json(user))
    .catch(next);

export const findAccount = (req, res, next) => {
  // If a query string ?publicAddress=... is given, then filter results

  return User.find({ publicAddress: req.params.publicAddress })
    .then(users => res.json(users))
    .catch(next);
};
