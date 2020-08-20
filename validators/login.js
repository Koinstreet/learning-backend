const validator = require("validator");
const _ = require("lodash");

const validateLogin = (data) => {
  let errors = {};
  if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  return { errors, isValid: _.isEmpty(errors) };
};

module.exports = validateLogin;
