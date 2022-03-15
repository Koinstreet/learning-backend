const validator = require("validator");
const _ = require("lodash");

const validateReplies = (data) => {
  let errors = {};
  data.comment = data.comment ? data.comment : "";

  if (validator.isEmpty(data.comment)) {
    errors.comment = "comment is required";
  }

  return { errors, isValid: _.isEmpty(errors) };
};

module.exports = validateReplies;
