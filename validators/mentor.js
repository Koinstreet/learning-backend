const validator = require("validator");
const _ = require("lodash");

const validateMentor = (data) => {
  let errors = {};
  data.skill_level = data.skill_level ? data.skill_level : "";
  data.availability = data.availability ? data.availability : "";

  if (validator.isEmpty(data.skill_level)) {
    errors.skill_level = "skill_level is required";
  }
  if (validator.isEmpty(data.availability)) {
    errors.availability = "availability is required";
  }
  return { errors, isValid: _.isEmpty(errors) };
};

module.exports = validateMentor;
