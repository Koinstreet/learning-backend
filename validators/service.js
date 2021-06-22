const validator = require("validator");
const _ = require("lodash");

const validateService = (data) => {
  let errors = {};
  data.project_name = data.project_name ? data.project_name : "";
  data.email = data.email ? data.email : "";

  if (validator.isEmpty(data.project_name)) {
    errors.project_name = "project_name is required";
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "email is required";
  }
  return { errors, isValid: _.isEmpty(errors) };
};

module.exports = validateService;
