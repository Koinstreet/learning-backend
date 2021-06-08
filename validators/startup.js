const validator = require("validator");
const _ = require("lodash");

const validateStartup = (data) => {
  let errors = {};
  data.location = data.location ? data.location : "";
  data.about = data.about ? data.about : "";
  data.name = data.name ? data.name : "";

  if (validator.isEmpty(data.location)) {
    errors.location = "location field is required";
  }
  if (validator.isEmpty(data.about)) {
    errors.about = "about field is required";
  }
  if (validator.isEmpty(data.name)) {
    errors.name = "name field is required";
  }
  return { errors, isValid: _.isEmpty(errors) };
};

module.exports = validateStartup;
