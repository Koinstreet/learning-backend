const validator = require("validator");
const _ = require("lodash");

const validateProposalStatus = (data) => {
  let errors = {};
  data.proposal_id = data.proposal_id ? data.proposal_id : null;

  if (validator.isEmpty(data.proposal_id)) {
    errors.proposal_id = "proposal_id is required";
  }

  return { errors, isValid: _.isEmpty(errors) };
};

module.exports = validateProposalStatus;
