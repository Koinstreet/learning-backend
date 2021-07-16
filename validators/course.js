const validator = require("validator");
const _ = require("lodash");

const validateCourse = (data) => {
  let errors = {};
  data.name = data.name ? data.name : "";
  data.highlight = data.highlight ? data.highlight : "";
  data.overview = data.overview ? data.overview : "";
  data.moduleId = data.moduleId ? data.moduleId : "";
  data.earn = data.earn ? data.earn : "";
  data.description = data.description ? data.description : "";

  if (validator.isEmpty(data.name)) {
    errors.name = "Course name is required";
  }
  if (validator.isEmpty(data.highlight)) {
    errors.highlight = "Highlight field is required";
  }
  if (validator.isEmpty(data.overview)) {
    errors.overview = "Overview field is required";
  }
  if (validator.isEmpty(data.earn)) {
    errors.earn = "Course earn is required";
  }
  if (validator.isEmpty(data.moduleId)) {
    errors.moduleId = "Course moduleId is required";
  }
  if (validator.isEmpty(data.description)) {
    errors.description = "Course description is required";
  }
  return { errors, isValid: _.isEmpty(errors) };
};

module.exports = validateCourse;
