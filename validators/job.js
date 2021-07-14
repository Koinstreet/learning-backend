const validator = require("validator");
const _ = require("lodash");

const validateJob = (data) => {
  let errors = {};
  data.job_title = data.job_title ? data.job_title : "";
  data.job_description = data.job_description ? data.job_description : "";
  data.location = data.location ? data.location : "";
  data.application_link = data.application_link ? data.application_link : "";

  if (validator.isEmpty(data.job_title)) {
    errors.job_title = "job_title is required";
  }
  if (validator.isEmpty(data.application_link)) {
    errors.application_link = "application_link is required";
  }
  if (validator.isEmpty(data.job_description)) {
    errors.job_description = "job_description is required";
  }
  if (validator.isEmpty(data.location)) {
    errors.location = "location is required";
  }
  return { errors, isValid: _.isEmpty(errors) };
};

module.exports = validateJob;
