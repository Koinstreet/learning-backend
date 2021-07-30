module.exports = validateUserModules;
const validator = require("validator");
const _ = require("lodash");

const validateUserModules = (data) => {
  let errors = {};
  data.moduleId = data.moduleId ? data.moduleId : "";

  if (validator.isEmpty(data.moduleId)) {
    errors.moduleId = "moduleId is required";
  }

  return { errors, isValid: _.isEmpty(errors) };
};

module.exports = validateUserModules;