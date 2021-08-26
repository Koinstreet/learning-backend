const { CREATED, UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");

// DB
const Replies = require("../../../model/v1/Replies");
const Proposal = require("../../../model/v1/Proposal");


// Validation
const validateReplies = require("../../../validators/Replies");

const {
  successWithData,
  successNoData,
} = require("../../../utils/successHandler");

// Error
const AppError = require("../../../utils/appError");

exports.createReplies = async (req, res, next) => {
  const { errors, isValid } = validateReplies(req.body);
  try {
    let replies = {
        ...req.body,
        proposal_id: req.body.proposal_id,
        authorId : req.user.id,
      };

      const findProposal = await Proposal.findById(req.body.proposal_id).populate(
        "_id"
      );
    if (!findProposal) {
    console.log('no Proposal found')
    errors.msg = "Invalid Proposal";
      return AppError.validationError(res, BAD_REQUEST, errors);
    }

    const newReplies= await Replies.create(replies);

    return successWithData(
      res,
      CREATED,
      "Replies created successfully",
      newReplies
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getAllReplies= async (req, res, next) => {
  try {
    const Repliess = await Replies.find({}).populate("authorId").populate("proposal_id").sort("-createdAt");
    return successWithData(res, OK, "Replies fetched successfully", Repliess);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getUserReplies = async (req, res, next) => {
  try {
    const Repliess = await Replies.find({authorId : req.user.id}).populate("authorId").populate("proposal_id").sort("-createdAt");
    if (!Repliess) { let error = {message: "undefined Reply"}; return AppError.tryCatchError(res, error);}
    return successWithData(res, OK, "Replies fetched successfully", Repliess);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};


exports.getReplies = async (req, res, next) => {
  try {
    const Repliess = await Replies.findById(req.params.id).populate("authorId").populate("proposal_id").sort("-createdAt");
    if (!Repliess) { let error = {message: "undefined Reply"}; return AppError.tryCatchError(res, error);}
    return successWithData(res, OK, "Replies fetched successfully", Repliess);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.updateReplies = async (req, res, next) => {
  try {
    const RepliesUpdate = await Replies.findById(req.params.id);
    if (!RepliesUpdate) { let error = {message: "undefined Reply"}; return AppError.tryCatchError(res, error);}


    let replies = {
        ...req.body,
      };
    
    const modifiedReplies = await Replies.findOneAndUpdate(
      { _id: req.params.id },
      { ...replies },
      { new: true }
    );
    return successWithData(res, OK, "Reply modified", modifiedReplies);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.deleteReplies = async (req, res, file) => {
  try {
    const deletedProposal = await Replies.findOneAndDelete({ _id: req.params.id });
    if (!deletedProposal) { let error = {message: "undefined Reply"}; return AppError.tryCatchError(res, error);}
    return successNoData(res, OK, "Reply deleted");
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};
