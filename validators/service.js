const validator = require("validator");
const _ = require("lodash");

const validateService = (data) => {
  let errors = {};
  data.project_name = data.project_name ? data.project_name : "";
  data.contact_email = data.contact_email ? data.contact_email : "";

  if (validator.isEmpty(data.project_name)) {
    errors.project_name = "project_name is required";
  }
  if (validator.isEmpty(data.contact_email)) {
    errors.contact_email = "contact_email is required";
  }
  return { errors, isValid: _.isEmpty(errors) };
};

module.exports = validateService;
