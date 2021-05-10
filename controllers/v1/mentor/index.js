const { CREATED, UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");

// DB
const Mentor = require("../../../model/v1/Mentor");
const User = require("../../../model/v1/User");


const validateMentor = require("../../../validators/mentor");

const {
  successWithData,
  successNoData,
} = require("../../../utils/successHandler");

// Error
const AppError = require("../../../utils/appError");

exports.createMentor = async (req, res, next) => {
  try {
    let mentor = {
        ...req.body,
        user_id: req.user.id,
      };

    const newMentor= await Mentor.create(mentor);
    await User.findOneAndUpdate(
      { _id: req.user.id },
      { is_mentor: true }
    );
    return successWithData(
      res,
      CREATED,
      "Mentor created successfully",
      newMentor
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getAllMentors= async (req, res, next) => {
  try {
    const mentors = await Mentor.find({})
      .populate("user_id", "-password")
      .sort("-createdAt");
    return successWithData(res, OK, "mentors fetched successfully", mentors);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};


exports.getMentor = async (req, res, next) => {
  try {
    const mentor = await Mentor.findById(req.params.id).populate(
      "user_id",
      "-password"
    );
    if (!mentor) return AppError.tryCatchError(res, err);
    return successWithData(res, OK, "Mentor fetched successfully", mentor);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.updateMentor = async (req, res, next) => {
  
  try {
    const mentorUpdate = await Mentor.findById(req.params.id);
    if (!mentorUpdate) return AppError.tryCatchError(res, err);

    let mentor = {
        ...req.body,
        user_id: req.user.id,
      };
    
    const modifiedMentor = await Mentor.findOneAndUpdate(
      { _id: req.params.id },
      { ...mentor },
      { new: true }
    );
    return successWithData(res, OK, "Mentor modified", modifiedMentor);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.deleteMentor = async (req, res, file) => {
  try {
    await Mentor.findOneAndDelete({ _id: req.params.id });
    return successNoData(res, OK, "Mentor deleted");
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};
