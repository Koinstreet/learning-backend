const { CREATED, UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");

// DB
const MinorityEarned = require("../../../model/v1/minority_earned");

const {
    successWithData,
    successNoData,
  } = require("../../../utils/successHandler");

// Error
const AppError = require("../../../utils/appError");

exports.createMinorityEarned = async (req, res, next) => {
    try {
        let minority_earned;
        minority_earned = {
            ...req.body
        }
        const newMinorityEarned = await MinorityEarned.create(minority_earned);
        console.log(newMinorityEarned)
        return successWithData(
            res,
            CREATED,
            'minority_earned created successfully',
            newMinorityEarned
        );
    } catch (err) {
        console.log(err);
        return AppError.tryCatchError(res, err);
    }
};

exports.getAllMinorityEarned = async (req, res, next) => {
    try {
      const minority_earned = await MinorityEarned.find({})
        .sort("-createdAt");
      return successWithData(res, OK, "MinorityEarned fetched successfully", minority_earned);
    } catch (err) {
      console.log(err);
      return AppError.tryCatchError(res, err);
    }
};

exports.getMinorityEarned = async (req, res, next) => {
    try {
      const minority_earned = await MinorityEarned.findById(req.params.id);
      if (!minority_earned) return AppError.tryCatchError(res, err);
      return successWithData(res, OK, "MinorityEarned fetched successfully", minority_earned);
    } catch (err) {
      console.log(err);
      return AppError.tryCatchError(res, err);
    }
};

exports.updateMinorityEarned = async (req, res, next) => {
    try {
      const MinorityEarnedUpdate = await MinorityEarned.findById(req.params.id);
      if (!MinorityEarnedUpdate) return AppError.tryCatchError(res, err);
      let minority_earned;

      minority_earned = {
          ...req.body
      };

      const modifiedMinorityEarned = await MinorityEarned.findOneAndUpdate(
        { _id: req.params.id },
        { ...minority_earned },
        { new: true }
      );
      return successWithData(res, OK, "MinorityEarned modified", modifiedMinorityEarned);
    } catch (err) {
      console.log(err);
      return AppError.tryCatchError(res, err);
    }
};

exports.deleteMinorityEarned = async (req, res, file) => {
    try {
      await MinorityEarned.findOneAndDelete({ _id: req.params.id });
      return successNoData(res, OK, "resource deleted");
    } catch (err) {
      console.log(err);
      return AppError.tryCatchError(res, err);
    }
};
  