const validator = require("validator");
const _ = require("lodash");

const validateLocation = (data) => {
  let errors = {};
  data.location = data.location ? data.location : "";
  data.description = data.description ? data.description : "";
  data.LocationName = data.LocationName ? data.LocationName : "";


  if (validator.isEmpty(data.location)) {
    errors.location = "location is required";
  }
  if (validator.isEmpty(data.description)) {
    errors.description = "description is required";
  }
  if (validator.isEmpty(data.LocationName)) {
    errors.LocationName = "LocationName is required";
  }

  return { errors, isValid: _.isEmpty(errors) };
};

module.exports = validateLocation;
