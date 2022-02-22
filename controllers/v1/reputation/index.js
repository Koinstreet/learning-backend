const { CREATED, UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");

// DB
const Reputations = require("../../../model/v1/Reputation");

const {
  successWithData,
  successNoData
} = require("../../../utils/successHandler");

// Error
const AppError = require("../../../utils/appError");
const validateReputations = require("../../../validators/reputation");

exports.createReputations = async (req, res, next) => {
  try {
    const { errors, isValid } = validateReputations(req.body);
    if (!isValid) {
      return AppError.validationError(res, BAD_REQUEST, errors);
    }
    let reputations = {
      ...req.body,
      userId: req.user.id
    };

    const newReputations = await Reputations.create(reputations);
    return successWithData(
      res,
      CREATED,
      "Reputation created successfully",
      newReputations
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getAllReputationss = async (req, res, next) => {
  try {
    const Reputationss = await Reputations.find({})
      .populate("userId")
      .populate("startUp_id")
      .populate("event_id")
      .populate("project_id")
      .populate("authorId")
      .populate("chapter_id")
      .populate("course_id")
      .sort("-createdAt");
    return successWithData(
      res,
      OK,
      "Reputationss fetched successfully",
      Reputationss
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getReputation = async (req, res, next) => {
  try {
    const reputations = await Reputations.findById(req.params.id)
      .populate("userId")
      .populate("startUp_id")
      .populate("event_id")
      .populate("project_id")
      .populate("authorId")
      .populate("chapter_id")
      .populate("course_id");
    let err = "can not find Reputations";
    if (!reputations) return AppError.tryCatchError(res, err);
    return successWithData(
      res,
      OK,
      "Reputations fetched successfully",
      reputations
    );
  } catch (error) {
    console.log(error);
    return AppError.tryCatchError(res, error);
  }
};

exports.getUserReputations = async (req, res, next) => {
  try {
    const reputationss = await Reputations.find({ userId: req.user.id })
      .populate("userId")
      .populate("startUp_id")
      .populate("event_id")
      .populate("project_id")
      .populate("authorId")
      .populate("chapter_id")
      .populate("course_id")
      .sort("-createdAt");
    return successWithData(
      res,
      OK,
      "Reputationss fetched successfully",
      reputationss
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getReputationById = async (req, res) => {
  try {
    const reputationss = await Reputations.find({ userId: req.params.id })
      .populate("userId")
      .populate("startUp_id")
      .populate("event_id")
      .populate("project_id")
      .populate("authorId")
      .populate("chapter_id")
      .populate("course_id")
      .sort("-createdAt");
    return successWithData(
      res,
      OK,
      "Reputationss fetched successfully",
      reputationss
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.deleteReputations = async (req, res) => {
  try {
    await Reputations.findOneAndDelete({ _id: req.params.id });
    return successNoData(res, OK, "Reputation deleted");
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};
