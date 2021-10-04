const { CREATED, UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");

// DB
const ProposalView = require("../../../model/v1/proposalView");
const Proposals = require("../../../model/v1/Proposal");

// Validation
const validateProposalView = require("../../../validators/proposalView");

const {
  successWithData,
  successNoData,
} = require("../../../utils/successHandler");

// Error
const AppError = require("../../../utils/appError");

exports.createProposalView = async (req, res, next) => {
  const { errors, isValid } = validateProposalView(req.body);
  if (!isValid) {
    return AppError.validationError(res, BAD_REQUEST, errors);
  }
  try {

    let proposalView = {
        ...req.body,
        proposal_id: req.body.proposal_id,
        userId : req.user.id,
      };

      const findproposal = await Proposals.findById(req.body.proposal_id).populate("userId").populate("startUp_id").populate("event_id").populate("project_id")
    if (!findproposal) {
    console.log('no proposal found')
    errors.msg = "Invalid proposal";
    return AppError.validationError(res, BAD_REQUEST, errors);
    }

    const views = await ProposalView.find({userId: req.user.id}).sort("-createdAt");

    views.map((viewed) => {
      if ((viewed.proposal_id).toString() === (req.body.proposal_id).toString()){
      errors.msg = "Already viewed this Proposal";
      return AppError.validationError(res, UNAUTHORIZED, errors);
      }
    })

    const newProposalView= await ProposalView.create(proposalView);

    return successWithData(
      res,
      CREATED,
      "user viewed a Proposal",
      newProposalView
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getAllViewedProposals= async (req, res, next) => {
  try {
    const viewed = await ProposalView.find({}).populate("userId").populate("proposal_id").sort("-createdAt");
    return successWithData(res, OK, "views fetched successfully", viewed);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getAllUserViewedPropopsals = async (req, res, next) => {
  try {
    const ProposalViews = await ProposalView.find({userId : req.user.id}).populate("userId").populate("proposal_id").sort("-createdAt");
    if (!ProposalViews) { let error = {message: "you have not viewed any Proposal"}; return AppError.tryCatchError(res, error);}
    return successWithData(res, OK, "user viewed proposals fetched successfully", ProposalViews);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};


exports.deleteProposalView = async (req, res, file) => {
  try {
    const proposalView = await ProposalView.findOneAndDelete({ _id: req.params.id });
    if (!proposalView) { let error = {message: "undefined proposal View"}; return AppError.tryCatchError(res, error);}
    return successNoData(res, OK, "proposal View deleted");
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};
