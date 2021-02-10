const { CREATED, UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");

// DB
const db = require("../DB/db");
const Subscriber = db.subscribers;

// Error
const AppError = require("../utils/appError");
// Success
const AppSuccess = require("../utils/successHandler");

exports.addSubscriber = async (req, res, next) => {
  const errors = {};
  try {
    if (req.body.email) {
      const checkSubscriber = await Subscriber.findOne({
        where: { email: req.body.email },
      });
      if (checkSubscriber) {
        errors.msg = "Subscriber already exists";
        return AppError.validationError(res, BAD_REQUEST, errors);
      }
      const newSubscriber = await Subscriber.create(req.body);
      res.status(CREATED).json({
        status: "success",
        msg: "Subscriber created succesfully",
      });
    } else {
      errors.msg = "Email required";
      return AppError.validationError(res, BAD_REQUEST, errors);
    }
  } catch (err) {
    return AppError.tryCatchError(res, err);
  }
};

exports.getAllSubscriber = async (req, res, next) => {
  try {
    const allSubscribers = await Subscriber.findAll();
    res.status(OK).json({
      status: "success",
      data: {
        subscribers: allSubscribers,
      },
    });
  } catch (err) {
    return AppError.tryCatchError(res, err);
  }
};
