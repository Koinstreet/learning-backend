module.exports = validateChat;
const validator = require("validator");
const _ = require("lodash");

const validateChat = (data) => {
  let errors={};
  data[0] = data[0] ? data[0] : "";
  data[1] = data[1] ? data[1] : "";

  if(validator.isEmpty(data[0])) {
    errors.users = "original sending user is required";
  }
  if(validator.isEmpty(data[1])) {
    errors.users = "a receiving user is required";
  }
  if(data[0]===data[1]) {
    errors.users = "a user cannot make a chat with themself"
  }

  return { errors, isValid: _.isEmpty(errors) };
};

module.exports = validateChat;