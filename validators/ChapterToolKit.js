const validator = require("validator");
const _ = require("lodash");

const validateChapterToolKit = (data) => {
  let errors = {};
  data.title = data.slug ? data.slug : "";


  if (validator.isEmpty(data.slug)) {
    errors.slug = "slug is required";
  }

  return { errors, isValid: _.isEmpty(errors) };
};

module.exports = validateChapterToolKit;
