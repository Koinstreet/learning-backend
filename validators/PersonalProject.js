const validator = require("validator");
const _ = require("lodash");

const validatePersonalProject = data => {
  let errors = {};
  data.title = data.title ? data.title : "";

  if (validator.isEmpty(data.title)) {
    errors.title = "title is required";
  }
  return { errors, isValid: _.isEmpty(errors) };
};

module.exports = validatePersonalProject;
