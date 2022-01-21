const validator = require("validator");
const _ = require("lodash");

const validateExperience = data => {
  let errors = {};
  data.jobTitle = data.jobTitle ? data.jobTitle : "";
  data.company = data.company ? data.company : "";

  if (validator.isEmpty(data.jobTitle)) {
    errors.company = "company is required";
  }
  if (validator.isEmpty(data.jobTitle)) {
    errors.jobTitle = "jobTitle is required";
  }
  return { errors, isValid: _.isEmpty(errors) };
};

module.exports = validateExperience;
