const validator = require("validator");
const _ = require("lodash");

const validateProposal = (data) => {
  let errors = {};
  data.title = data.title ? data.title : "";
  data.description = data.description ? data.description : "";

  if (validator.isEmpty(data.description)) {
    errors.description = "description is required";
  }

  return { errors, isValid: _.isEmpty(errors) };
};

module.exports = validateProposal;
