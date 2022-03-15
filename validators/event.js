const validator = require("validator");
const _ = require("lodash");

const validateEvent = (data) => {
  let errors = {};

  data.eventName = data.eventName ? data.eventName : "";
  data.eventLink = data.eventLink ? data.eventLink : "";
  data.EventDescription = data.EventDescription ? data.EventDescription : "";

  if (validator.isEmpty(data.eventName)) {
    errors.eventName = "eventName field is required";
  }
  if (validator.isEmpty(data.eventLink)) {
    errors.eventLink = "eventLink field is required";
  }
  if (validator.isEmpty(data.EventDescription)) {
    errors.EventDescription = "EventDescription is required";
  }
  return { errors, isValid: _.isEmpty(errors) };
};

module.exports = validateEvent;
