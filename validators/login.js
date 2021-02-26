const validator = require("validator");
const _ = require("lodash");

const validateLogin = (data) => {
  let errors = {};
  if (data.email && !validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  if (!data.email) {
    errors.email = "Email field is required";
  }
  if (!data.password) {
    errors.password = "Password field is required";
  }
  return { errors, isValid: _.isEmpty(errors) };
};

module.exports = validateLogin;
