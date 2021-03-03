
const { OK } = require("http-status-codes");

// DB
const User = require("../../../model/v1/User");


// Error
const AppError = require("../../../utils/appError");
// Success
const { successWithData } = require("../../../utils/successHandler");


exports.getUser = async (req, res, next) => {
    console.log(req.user)

  try {
    const user = await User.findById(req.params.id);
    successWithData(res, OK, "user successful", user);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};
