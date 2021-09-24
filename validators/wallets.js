const validator = require("validator");
const _ = require("lodash");

const validateWallet = (data) => {
  let errors = {};
  data.walletAddress = data.walletAddress ? data.walletAddress : "";
  data.walletType = data.walletType ? data.walletType : "";

  if (validator.isEmpty(data.walletAddress)) {
    errors.walletAddress = "walletAddress field is required";
  }
  if (validator.isEmpty(data.walletType)) {
    errors.walletType = "walletType field is required";
  }
  return { errors, isValid: _.isEmpty(errors) };
};

module.exports = validateWallet;
