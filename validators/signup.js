const validator = require("validator");
const _ = require("lodash");

const validateSignup = (data) => {
  console.log(data)
  let errors = {};
  if (data.email && !validator.isEmail(data.email ? data.email : "")) {
    errors.email = "Email is invalid";
  }
  if (data.password && !validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }
  if (data.password && data.confirmPassword && !validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = "Passwords must match";
  }
  if (!data.firstName) {
    errors.firstName = "First name field is required";
  }
  if (!data.lastName) {
    errors.lastName = "Last name field is required";
  }
  if (!data.userName) {
    errors.userName = "user Name field is required";
  }
  if (!data.email) {
    errors.email = "Email field is required";
  }
  if (!data.password) {
    errors.password = "Password field is required";
  }
  if (!data.confirmPassword) {
    errors.confirmPassword = "Confirm Password field is required";
  }
  // if (!validator.isEmpty(data.role) && !(data.role === "user" || data.role === "admin")) {
  //   errors.role = "Invalid role";
  // }
  return { errors, isValid: _.isEmpty(errors) };
};

module.exports = validateSignup;
