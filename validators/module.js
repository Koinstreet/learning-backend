const validator = require("validator");
const _ = require("lodash");

const validateCourse = (data) => {
  let errors = {};
  data.name = data.name ? data.name : "";
  data.type = data.type ? data.type : "";
  data.content = data.content ? data.content : "";
  data.week = data.week ? data.week : "";
  data.ActivityId = data.ActivityId ? data.ActivityId : "";
  data.courseId = data.courseId ? data.courseId : "";
  
  if (validator.isEmpty(data.name)) {
    errors.name = "Module name is required";
  }
  if (validator.isEmpty(data.week)) {
    errors.week = "Module week is required";
  }
  if (validator.isEmpty(data.content)) {
    errors.content = "Module content is required";
  }
  if (validator.isEmpty(data.type)) {
    errors.type = "Module type is required";
  }
  if (validator.isEmpty(data.ActivityId)) {
    errors.ActivityId = "Module ActivityId is required";
  }
  if (validator.isEmpty(data.courseId)) {
    errors.courseId = "Module courseId is required";
  }
  return { errors, isValid: _.isEmpty(errors) };
};

module.exports = validateCourse;
