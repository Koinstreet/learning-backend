const { CREATED, UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");

// DB
const Subscriber = require("../../../model/v1/Subscriber");

const {
  successNoData,
  successWithData,
} = require("../../../utils/successHandler");

// Error
const AppError = require("../../../utils/appError");

exports.addSubscriber = async (req, res, next) => {
  const errors = {};
  try {
    if (req.body.email) {
      const checkSubscriber = await Subscriber.findOne({
        email: req.body.email,
      });
      if (checkSubscriber) {
        errors.msg = "Subscriber already exists";
        return AppError.validationError(res, BAD_REQUEST, errors);
      }
      await Subscriber.create(req.body);
      return successNoData(res, CREATED, "Subscriber created succesfully");
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
    const allSubscribers = await Subscriber.find({});
    return successWithData(res, OK, "All subscribers", allSubscribers);
  } catch (err) {
    return AppError.tryCatchError(res, err);
  }
};
