module.exports = validateSavedEvent;
const validator = require("validator");
const _ = require("lodash");

const validateSavedEvent = (data) => {
  let errors = {};
  data.event_id = data.event_id ? data.event_id : "";
  data.attending = data.attending ? data.attending : "";

  if (validator.isEmpty(data.event_id)) {
    errors.event_id = "event_id is required";
  }

  if (validator.isEmpty(data.attending)) {
    errors.attending = "event attendance is required";
  }

  return { errors, isValid: _.isEmpty(errors) };
};

module.exports = validateSavedEvent;
