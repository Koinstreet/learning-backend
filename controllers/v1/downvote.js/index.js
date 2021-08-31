const { CREATED, UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");

// DB
const DownVotes = require("../../../model/v1/DownVotes");
const Startup = require("../../../model/v1/Startups");
const Proposal = require("../../../model/v1/Proposal");

const {
  successWithData,
  successNoData,
} = require("../../../utils/successHandler");

// Error
const AppError = require("../../../utils/appError");

exports.createDownVotes = async (req, res, next) => {
  try {
    let downVotes = {
        ...req.body,
        startup_Id: req.body.startup_Id,
        proposal_Id: req.body.proposal_Id,
        authorId : req.user.id,
    };

      if(req.body.startup_Id){

      const findStartDown= await Startup.findById(req.body.startup_Id).populate(
        "_id"
      );

    if (!findStartDown) {
    console.log('no StartDown found')
    let errors = "Invalid StartDown";
        return AppError.validationError(res, BAD_REQUEST, errors);
    }

    if(req.body.proposal_Id){

        const findproposal= await Proposal.findById(req.body.proposal_Id).populate(
            "_id"
        );
    
        if (!findproposal) {
            console.log('no proposal found')
            let errors = "Invalid proposal";
            return AppError.validationError(res, BAD_REQUEST, errors);
        }
    }
}
    

    const newDownVotes= await DownVotes.create(downVotes);

    return successWithData(
      res,
      CREATED,
      "DownVote created successfully",
      newDownVotes
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getAllDownVotes= async (req, res, next) => {
  try {
    const DownVotess = await DownVotes.find({}).populate("authorId").populate("proposal_Id").populate("startup_Id").sort("-createdAt");
    return successWithData(res, OK, "DownVotes fetched successfully", DownVotess);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getUserDownVotes = async (req, res, next) => {
  try {
    const DownVotess = await DownVotes.find({authorId : req.user.id}).populate("authorId").populate("proposal_Id").populate("startup_Id").sort("-createdAt");
    if (!DownVotess) { let error = {message: "undefined Downvote"}; return AppError.tryCatchError(res, error);}
    return successWithData(res, OK, "DownVotes fetched successfully", DownVotess);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getStartupVotes = async (req, res, next) => {
    try {
      const DownVotess = await DownVotes.find({startup_Id : req.user.id}).populate("authorId").populate("proposal_Id").populate("startup_Id").sort("-createdAt");
      if (!DownVotess) { let error = {message: "undefined Downvote"}; return AppError.tryCatchError(res, error);}
      return successWithData(res, OK, "DownVotes fetched successfully", DownVotess);
    } catch (err) {
      console.log(err);
      return AppError.tryCatchError(res, err);
    }
  };

  exports.getProposalDownVotes = async (req, res, next) => {
    try {
      const DownVotess = await DownVotes.find({proposal_Id : req.user.id}).populate("authorId").populate("proposal_Id").populate("startup_Id").sort("-createdAt");
      if (!DownVotess) { let error = {message: "undefined Downvote"}; return AppError.tryCatchError(res, error);}
      return successWithData(res, OK, "DownVotes fetched successfully", DownVotess);
    } catch (err) {
      console.log(err);
      return AppError.tryCatchError(res, err);
    }
  };

exports.getDownVote = async (req, res, next) => {
  try {
    const DownVotess = await DownVotes.findById(req.params.id).populate("authorId").populate("proposal_Id").populate("startup_Id").sort("-createdAt");
    if (!DownVotess) { let error = {message: "undefined Downvote"}; return AppError.tryCatchError(res, error);}
    return successWithData(res, OK, "DownVote fetched successfully", DownVotess);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.updateDownVotes = async (req, res, next) => {
  try {
    const DownVotesDowndate = await DownVotes.findById(req.params.id);
    if (!DownVotesDowndate) { let error = {message: "undefined Downvote"}; return AppError.tryCatchError(res, error);}


    let downVotes = {
        ...req.body,
      };
    
    const modifiedDownVotes = await DownVotes.findOneAndDowndate(
      { _id: req.params.id },
      { ...downVotes },
      { new: true }
    );
    return successWithData(res, OK, "Downvote modified", modifiedDownVotes);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.deleteDownVotes = async (req, res, file) => {
  try {
    const deletedVote = await DownVotes.findOneAndDelete({ _id: req.params.id });
    if (!deletedVote) { let error = {message: "undefined Downvote"}; return AppError.tryCatchError(res, error);}
    return successNoData(res, OK, "Downvote deleted");
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};
