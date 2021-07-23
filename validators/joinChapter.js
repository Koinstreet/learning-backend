module.exports = validateJoinChapter;
const validator = require("validator");
const _ = require("lodash");

const validateJoinChapter = (data) => {
  let errors = {};
  data.chapterLocation_id = data.chapterLocation_id ? data.chapterLocation_id : "";

  if (validator.isEmpty(data.chapterLocation_id)) {
    errors.chapterLocation_id = "chapterLocation_id is required";
  }

  return { errors, isValid: _.isEmpty(errors) };
};

module.exports = validateJoinChapter;