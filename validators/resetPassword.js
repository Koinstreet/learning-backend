const validator = require("validator");
const _ = require("lodash");

const validateResetPassword = data => {
  let errors = {
    password: "",
    confirmPassword: ""
  };
  if (
    data.password &&
    !validator.isLength(data.password, { min: 6, max: 30 })
  ) {
    errors.password = "Password must be at least 6 characters";
  }
  if (
    data.password &&
    data.confirmPassword &&
    !validator.equals(data.password, data.confirmPassword)
  ) {
    errors.confirmPassword = "Passwords must match";
  }
  if (!data.password) {
    errors.password = "Password field is required";
  }
  if (!data.confirmPassword) {
    errors.confirmPassword = "Confirm Password field is required";
  }
  return { errors, isValid: _.isEmpty(errors) };
};

module.exports = validateResetPassword;
