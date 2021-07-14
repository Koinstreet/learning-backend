const validator = require("validator");
const _ = require("lodash");

const validateCompany = (data) => {
  let errors = {};
  data.company_name = data.company_name ? data.company_name : "";
  data.company_description = data.company_description ? data.company_description : "";
  data.headquarter = data.headquarter ? data.headquarter : "";
  data.application_link = data.application_link ? data.application_link : "";

  if (validator.isEmpty(data.company_name)) {
    errors.company_name = "company_name is required";
  }
  if (validator.isEmpty(data.application_link)) {
    errors.application_link = "application_link is required";
  }
  if (validator.isEmpty(data.company_description)) {
    errors.company_description = "company_description is required";
  }
  if (validator.isEmpty(data.headquarter)) {
    errors.headquarter = "headquarter is required";
  }
  return { errors, isValid: _.isEmpty(errors) };
};

module.exports = validateCompany;
