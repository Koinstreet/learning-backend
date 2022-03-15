const validator = require("validator");
const _ = require("lodash");

const validateEducation = data => {
  let errors = {};
  data.name = data.name ? data.name : "";
  data.major = data.major ? data.major : "";

  if (validator.isEmpty(data.name)) {
    errors.major = "major is required";
  }
  if (validator.isEmpty(data.name)) {
    errors.name = "name is required";
  }
  return { errors, isValid: _.isEmpty(errors) };
};

module.exports = validateEducation;
