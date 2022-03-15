const validator = require("validator");
const _ = require("lodash");

const validateclaimProject = (data) => {
  let errors = {};
  data.project_id = data.project_id ? data.project_id : "";

  if (validator.isEmpty(data.project_id)) {
    errors.project_id = "project_id is required";
  }

  return { errors, isValid: _.isEmpty(errors) };
};

module.exports = validateclaimProject;
