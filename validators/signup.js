const validator = require("validator");
const _ = require("lodash");

const validateSignup = (data) => {
  console.log(data)
  let errors = {};
  if (validator.isEmpty(data.firstName)) {
    errors.firstName = "First name is required";
  }
  if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }
  if (!validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = "Passwords must match";
  }
  if (validator.isEmpty(data.firstName)) {
    errors.firstName = "First name field is required";
  }
  if (validator.isEmpty(data.lastName)) {
    errors.lastName = "First name field is required";
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  if (validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = "Confirm Password field is required";
  }
  // if (!validator.isEmpty(data.role) && !(data.role === "user" || data.role === "admin")) {
  //   errors.role = "Invalid role";
  // }
  return { errors, isValid: _.isEmpty(errors) };
};

module.exports = validateSignup;
