const validator = require("validator");
const _ = require("lodash");

const validateProject = data => {
  let errors = {};
  data.industry_of_business = data.industry_of_business
    ? data.industry_of_business
    : "";
  data.type_of_business = data.type_of_business ? data.type_of_business : "";

  if (validator.isEmpty(data.industry_of_business)) {
    errors.industry_of_business = "industry_of_business is required";
  }
  if (validator.isEmpty(data.type_of_business)) {
    errors.type_of_business = "type_of_business is required";
  }
  return { errors, isValid: _.isEmpty(errors) };
};

module.exports = validateProject;
