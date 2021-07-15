module.exports = validateSavedJob;
const validator = require("validator");
const _ = require("lodash");

const validateSavedJob = (data) => {
  let errors = {};
  data.job_id = data.job_id ? data.job_id : "";

  if (validator.isEmpty(data.job_id)) {
    errors.job_id = "job_id is required";
  }

  return { errors, isValid: _.isEmpty(errors) };
};

module.exports = validateSavedJob;