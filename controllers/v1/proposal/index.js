const { CREATED, UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");

// DB
const Proposal = require("../../../model/v1/Proposal");
const Replies = require("../../../model/v1/Replies");

const uploadImage = require("../../../utils/uploadImage");
const {
    successWithData,
    successNoData,
} = require("../../../utils/successHandler");

// Error
const AppError = require("../../../utils/appError");
const validateProposal = require("../../../validators/proposal");

exports.createProposal = async (req, res, next) => {
    try {
      let proposal;
      if (req.file) {
        const data = await uploadImage(req.file);
        if (!data.url || !data.public_id) return AppError.tryCatchError(res, err);
        proposal = {
          ...req.body,
          userId : req.user.id,
          avatar: data.url,
        };
      } else {
        proposal = {
          ...req.body,
          userId : req.user.id,
        };
      }
  
      const newProposal = await Proposal.create(proposal);
      return successWithData(
        res,
        CREATED,
        "proposal created successfully",
        newProposal
      );
    } catch (err) {
      console.log(err);
      return AppError.tryCatchError(res, err);
    }
  };

  exports.createReplies = async (req, res, next) => {
    const { errors, isValid } = validateProposal(req.body);
    try {
      let replies = {
          ...req.body,
          proposal_id: req.body.proposal_id,
          userId : req.user.id,
        };
  
        const findProposal = await Proposal.findById(req.params.id).populate(
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

  exports.getAllProposals = async (req, res, next) => {
    try {
      const proposals = await Proposal.find({}).populate("userId").populate("startUp_id").populate("event_id").populate("project_id")
        .sort("-createdAt");
      return successWithData(res, OK, "Proposals fetched successfully", proposals);
    } catch (err) {
      console.log(err);
      return AppError.tryCatchError(res, err);
    }
  };

  exports.getProposal = async (req, res, next) => {
    try {
      const proposal = await Proposal.findById(req.params.id).populate("userId").populate("startUp_id").populate("event_id").populate("project_id");
      let err = "can not find proposal"
      if (!proposal) return AppError.tryCatchError(res, err);
      return successWithData(res, OK, "proposal fetched successfully", proposal);
    } catch (error) {
      console.log(error);
      return AppError.tryCatchError(res, error);
    }
  };

  exports.getProposalReplies= async (req, res, next) => {
    try {
      const Repliess = await Replies.find({proposal_id: req.params.id}).populate("userId").populate("proposal_id").sort("-createdAt");
      return successWithData(res, OK, "Replies fetched successfully", Repliess);
    } catch (err) {
      console.log(err);
      return AppError.tryCatchError(res, err);
    }
  };

  exports.getUserProposal = async (req, res, next) => {
    try {
      const proposals = await Proposal.find({userId: req.user.id}).populate("userId").populate("startUp_id").populate("event_id").populate("project_id")
        .sort("-createdAt");
      return successWithData(res, OK, "Proposals fetched successfully", proposals);
    } catch (err) {
      console.log(err);
      return AppError.tryCatchError(res, err);
    }
  };

  exports.updateProposal = async (req, res, next) => {
    try {
      const proposalUpdate = await Proposal.findById(req.params.id);
      if (!proposalUpdate){let err = 'undefined notification'; return AppError.tryCatchError(res, err);}

      let proposal;

      if (req.file) {
        const data = await uploadImage(req.file);
        if (!data.url || !data.public_id)
          return AppError.tryCatchError(this.res, err);
        proposal = {
          ...req.body,
          avatar: data.url,
        };
      } else {
        proposal = {
          ...req.body
        };
      }
      const updatedProposal = await Proposal.findOneAndUpdate(
        { _id: req.params.id },
        { ...proposal },
        { new: true }
      );
      return successWithData(res, OK, "Proposal updated", updatedProposal);
    } catch (err) {
      console.log(err);
      return AppError.tryCatchError(res, err);
    }
  };
  
  exports.deleteProposal = async (req, res) => {
    try {
      await Proposal.findOneAndDelete({ _id: req.params.id });
      return successNoData(res, OK, "Proposal deleted");
    } catch (err) {
      console.log(err);
      return AppError.tryCatchError(res, err);
    }
  };
  
  exports.updateReplies = async (req, res, next) => {
    try {
      const RepliesUpdate = await Replies.findById(req.params.id);
      if (!RepliesUpdate) { let error = {message: "undefined Reply"}; return AppError.tryCatchError(res, error);}
      if (RepliesUpdate.userId.toString() !== req.user.id.toString()){
        let error = {message: "You do not have permission to update this comment"}; return AppError.tryCatchError(res, error);
      }
      if(RepliesUpdate.proposal_id.toString() !== req.params.proposalId.toString()){
        let error = {message: "this comment doesn't belong to this proposal"}; return AppError.tryCatchError(res, error);
      }
  
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
      const findReply = await Replies.find({ _id: req.params.id });
      if (!findReply) { let error = {message: "undefined Reply"}; return AppError.tryCatchError(res, error);}
      if (findReply.userId.toString() !== req.user.id.toString()){
        let error = {message: "You do not have permission to delete this comment"}; return AppError.tryCatchError(res, error);
      }
      if(findReply.proposal_id.toString() !== req.params.proposalId.toString()){
        let error = {message: "this comment doesn't belong to this proposal"}; return AppError.tryCatchError(res, error);
      }
      const deleteReply= await Replies.findOneAndDelete({ _id: req.params.id });
      if (!deleteReply) { let error = {message: "undefined Reply"}; return AppError.tryCatchError(res, error);}
      return successNoData(res, OK, "Reply deleted");
    } catch (err) {
      console.log(err);
      return AppError.tryCatchError(res, err);
    }
  };
  