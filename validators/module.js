const validator = require("validator");
const _ = require("lodash");

const validateCourse = (data) => {
  let errors = {};
  data.name = data.name ? data.name : "";
  data.type = data.type ? data.type : "";
  data.content = data.content ? data.content : "";

  if (validator.isEmpty(data.name)) {
    errors.name = "Module name is required";
  }
  if (validator.isEmpty(data.type)) {
    errors.type = "Module type is required";
  }

  return { errors, isValid: _.isEmpty(errors) };
};

module.exports = validateCourse;
