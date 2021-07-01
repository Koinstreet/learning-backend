const { CREATED, UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");

// DB
const Proposal = require("../../../model/v1/Proposal");

const uploadImage = require("../../../utils/uploadImage");
const {
    successWithData,
    successNoData,
} = require("../../../utils/successHandler");

// Error
const AppError = require("../../../utils/appError");

exports.createProposal = async (req, res, next) => {
    try {
      let proposal;
      if (req.file) {
        const data = await uploadImage(req.file);
        if (!data.url || !data.public_id) return AppError.tryCatchError(res, err);
        proposal = {
          ...req.body,
          avatar: data.url,
        };
      } else {
        proposal = {
          ...req.body
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

  exports.getAllProposals = async (req, res, next) => {
    try {
      const proposals = await Proposal.find({})
        .sort("-createdAt");
      return successWithData(res, OK, "Proposals fetched successfully", proposals);
    } catch (err) {
      console.log(err);
      return AppError.tryCatchError(res, err);
    }
  };

  exports.getProposal = async (req, res, next) => {
    try {
      const proposal = await Proposal.findById(req.params.id);
      if (!proposal) return AppError.tryCatchError(res, err);
      return successWithData(res, OK, "proposal fetched successfully", proposal);
    } catch (err) {
      console.log(err);
      return AppError.tryCatchError(res, err);
    }
  };

  exports.updateProposal = async (req, res, next) => {
    try {
      const proposalUpdate = await Proposal.findById(req.params.id);
      if (!proposalUpdate) return AppError.tryCatchError(res, err);

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
  