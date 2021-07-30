module.exports = validateEnrolledCourse;
const validator = require("validator");
const _ = require("lodash");

const validateEnrolledCourse = (data) => {
  let errors = {};
  data.courseId = data.courseId ? data.courseId : "";

  if (validator.isEmpty(data.courseId)) {
    errors.courseId = "courseId is required";
  }

  return { errors, isValid: _.isEmpty(errors) };
};

module.exports = validateEnrolledCourse;