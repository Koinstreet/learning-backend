const validator = require("validator");
const _ = require("lodash");

const validateMentee = (data) => {
  let errors = {};
  data.interest_in = data.interest_in ? data.interest_in : "";
  data.goals = data.goals ? data.goals : "";

  if (validator.isEmpty(data.interest_in)) {
    errors.interest_in = "interest_in is required";
  }
  if (validator.isEmpty(data.goals)) {
    errors.goals = "goals is required";
  }
  return { errors, isValid: _.isEmpty(errors) };
};

module.exports = validateMentee;
