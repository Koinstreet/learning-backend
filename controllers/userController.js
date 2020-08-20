
const { CREATED, UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");

// DB
const db = require("../DB/db");
const User = db.users;


// Error
const AppError = require("../utils/appError");
// Success
const AppSuccess = require("../utils/successHandler");


exports.getUser = async (req, res, next) => {
    console.log(req.user)

  try {
    console.log(typeof req.params.id)
    const user = await User.findByPk(req.params.id);
    res.send(user)
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};
