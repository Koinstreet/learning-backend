const validateSignup = require("./signup");
const validateLogin = require("./login");
const validateCourse = require("./course");
const validateModule = require("./module");
const validateForgotPassword = require("./forgotPassword");
const validateResetPassword = require("./resetPassword");

module.exports = {
  validateSignup,
  validateLogin,
  validateCourse,
  validateModule,
  validateForgotPassword,
  validateResetPassword,
};
