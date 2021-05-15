const validator = require("validator");
const _ = require("lodash");

const validateStartup = (data) => {
  let errors = {};
  data.targetAmount = data.targetAmount ? data.targetAmount : "";
  data.location = data.location ? data.location : "";
  data.about = data.about ? data.about : "";

  if (validator.isEmpty(data.targetAmount)) {
    errors.targetAmount = "targetAmount  is required";
  }
  if (validator.isEmpty(data.location)) {
    errors.location = "location field is required";
  }
  if (validator.isEmpty(data.about)) {
    errors.about = "about field is required";
  }
  return { errors, isValid: _.isEmpty(errors) };
};

module.exports = validateStartup;
