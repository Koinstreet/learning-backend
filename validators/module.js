const validator = require("validator");
const _ = require("lodash");

const validateModule = (data) => {
  let errors = {};
  return { errors, isValid: _.isEmpty(errors) };
};

module.exports = validateModule;