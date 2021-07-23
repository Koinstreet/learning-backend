const { CREATED, UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");

// DB
const Mentee = require("../../../model/v1/Mentee");

const validateMentee = require("../../../validators/mentee");

const {
  successWithData,
  successNoData,
} = require("../../../utils/successHandler");

// Error
const AppError = require("../../../utils/appError");

exports.createMentee = async (req, res, next) => {
  try {
    let mentee = {
        ...req.body,
        user_id: req.user.id,
      };

    const newMentee= await Mentee.create(mentee);
    return successWithData(
      res,
      CREATED,
      "Mentee created successfully",
      newMentee
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getAllMentee= async (req, res, next) => {
  try {
    const mentees = await Mentee.find({})
      .populate("user_id", "-password")
      .sort("-createdAt");
    return successWithData(res, OK, "Mentee fetched successfully", mentees);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};


exports.getMentee = async (req, res, next) => {
  try {
    const mentee = await Mentee.findById(req.params.id).populate(
      "user_id",
      "-password"
    );
    if (!mentee) { let error = {message: "undefined mentee"}; return AppError.tryCatchError(res, error);}
    return successWithData(res, OK, "Mentee fetched successfully", mentee);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.updateMentee = async (req, res, next) => {
  
  try {

    const menteeUpdate = await Mentee.findById(req.params.id);
    if (!menteeUpdate) { let error = {message: "undefined mentee"}; return AppError.tryCatchError(res, error);}

    let mentee = {
        ...req.body,
        user_id: req.user.id,
      };
    
    const modifiedMentee = await Mentee.findOneAndUpdate(
      { _id: req.params.id },
      { ...mentee },
      { new: true }
    );
    return successWithData(res, OK, "Mentee modified", modifiedMentee);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.deleteMentee = async (req, res, file) => {
  try {
    await Mentee.findOneAndDelete({ _id: req.params.id });
    return successNoData(res, OK, "Mentee deleted");
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};
