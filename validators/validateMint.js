const validator = require("validator");
const _ = require("lodash");

const validateMint = data => {
  let errors = {};
  data.metadata = data.metadata ? data.metadata : "";
  data.userAddress = data.userAddress ? data.userAddress : "";

  if (validator.isEmpty(data.metadata)) {
    errors.metadata = "metadata field is required";
  }

  if (validator.isEmpty(data.userAddress)) {
    errors.userAddress = "userAddress field is required";
  }

  return { errors, isValid: _.isEmpty(errors) };
};

module.exports = validateMint;
