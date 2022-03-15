const validator = require("validator");
const _ = require("lodash");

const validateForgotPassword = data => {
  let errors = {
    email: ""
  };
  if (data.email && !validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  if (!data.email) {
    errors.email = "Email field is required";
  }
  return { errors, isValid: _.isEmpty(errors) };
};

module.exports = validateForgotPassword;
