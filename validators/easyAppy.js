const validator = require("validator");
const _ = require("lodash");

const validateEasyApply = (data) => {
  let errors = {};
  data.firstName = data.firstName ? data.firstName : "";
  data.lastName = data.lastName ? data.lastName : "";

  if (validator.isEmpty(data.firstName)) {
    errors.firstName = "firstName is required";
  }
  if (validator.isEmpty(data.lastName)) {
    errors.lastName = "lastName is required";
  }
  return { errors, isValid: _.isEmpty(errors) };
};

module.exports = validateEasyApply;
