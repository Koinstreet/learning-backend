const validator = require("validator");
const _ = require("lodash");

const validateEvent = (data) => {
  let errors = {};
  data.catName = data.catName ? data.catName : "";
  data.eventName = data.eventName ? data.eventName : "";
  data.eventLink = data.eventLink ? data.eventLink : "";
  data.actionLink = data.actionLink ? data.actionLink : "";
  data.callToAction = data.callToAction ? data.callToAction : "";


  if (validator.isEmpty(data.catName)) {
    errors.catName = "catName is required";
  }
  if (validator.isEmpty(data.eventName)) {
    errors.eventName = "eventName field is required";
  }
  if (validator.isEmpty(data.eventLink)) {
    errors.eventLink = "eventLink field is required";
  }
  if (validator.isEmpty(data.actionLink)) {
    errors.actionLink = "actionLink is required";
  }
  if (validator.isEmpty(data.callToAction)) {
    errors.callToAction = "callToAction is required";
  }
  return { errors, isValid: _.isEmpty(errors) };
};

module.exports = validateEvent;
