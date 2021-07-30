const validator = require("validator");
const _ = require("lodash");

const validateModule = (data) => {
  let errors = {};
  data.name = data.name ? data.name : "";

  if (validator.isEmpty(data.name)) {
    errors.name = "Module name is required";
  }
  return { errors, isValid: _.isEmpty(errors) };
};

module.exports = validateModule;