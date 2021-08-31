const { CREATED, UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");

// DB
const UpVotes = require("../../../model/v1/UpVotes");
const Startup = require("../../../model/v1/Startups");
const Proposal = require("../../../model/v1/Proposal");

const {
  successWithData,
  successNoData,
} = require("../../../utils/successHandler");

// Error
const AppError = require("../../../utils/appError");

exports.createUpVotes = async (req, res, next) => {
  try {
    let upVotes = {
        ...req.body,
        startup_Id: req.body.startup_Id,
        proposal_Id: req.body.proposal_Id,
        authorId : req.user.id,
    };

      if(req.body.startup_Id){

      const findStartup= await Startup.findById(req.body.startup_Id).populate(
        "_id"
      );

    if (!findStartup) {
    console.log('no Startup found')
    let errors = "Invalid Startup";
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
    

    const newUpVotes= await UpVotes.create(upVotes);

    return successWithData(
      res,
      CREATED,
      "UpVote created successfully",
      newUpVotes
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getAllUpVotes= async (req, res, next) => {
  try {
    const UpVotess = await UpVotes.find({}).populate("authorId").populate("proposal_Id").populate("startup_Id").sort("-createdAt");
    return successWithData(res, OK, "UpVotes fetched successfully", UpVotess);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getUserUpVotes = async (req, res, next) => {
  try {
    const UpVotess = await UpVotes.find({authorId : req.user.id}).populate("authorId").populate("proposal_Id").populate("startup_Id").sort("-createdAt");
    if (!UpVotess) { let error = {message: "undefined Upvote"}; return AppError.tryCatchError(res, error);}
    return successWithData(res, OK, "UpVotes fetched successfully", UpVotess);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getStartupUpVotes = async (req, res, next) => {
    try {
      const UpVotess = await UpVotes.find({startup_Id : req.user.id}).populate("authorId").populate("proposal_Id").populate("startup_Id").sort("-createdAt");
      if (!UpVotess) { let error = {message: "undefined Upvote"}; return AppError.tryCatchError(res, error);}
      return successWithData(res, OK, "UpVotes fetched successfully", UpVotess);
    } catch (err) {
      console.log(err);
      return AppError.tryCatchError(res, err);
    }
  };

  exports.getProposalUpVotes = async (req, res, next) => {
    try {
      const UpVotess = await UpVotes.find({proposal_Id : req.user.id}).populate("authorId").populate("proposal_Id").populate("startup_Id").sort("-createdAt");
      if (!UpVotess) { let error = {message: "undefined Upvote"}; return AppError.tryCatchError(res, error);}
      return successWithData(res, OK, "UpVotes fetched successfully", UpVotess);
    } catch (err) {
      console.log(err);
      return AppError.tryCatchError(res, err);
    }
  };

exports.getUpVote = async (req, res, next) => {
  try {
    const UpVotess = await UpVotes.findById(req.params.id).populate("authorId").populate("proposal_Id").populate("startup_Id").sort("-createdAt");
    if (!UpVotess) { let error = {message: "undefined Upvote"}; return AppError.tryCatchError(res, error);}
    return successWithData(res, OK, "UpVote fetched successfully", UpVotess);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.updateUpVotes = async (req, res, next) => {
  try {
    const UpVotesUpdate = await UpVotes.findById(req.params.id);
    if (!UpVotesUpdate) { let error = {message: "undefined Upvote"}; return AppError.tryCatchError(res, error);}


    let upVotes = {
        ...req.body,
      };
    
    const modifiedUpVotes = await UpVotes.findOneAndUpdate(
      { _id: req.params.id },
      { ...upVotes },
      { new: true }
    );
    return successWithData(res, OK, "Upvote modified", modifiedUpVotes);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.deleteUpVotes = async (req, res, file) => {
  try {
    const deletedVote = await UpVotes.findOneAndDelete({ _id: req.params.id });
    if (!deletedVote) { let error = {message: "undefined Upvote"}; return AppError.tryCatchError(res, error);}
    return successNoData(res, OK, "Upvote deleted");
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};
