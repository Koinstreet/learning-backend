const { CREATED, UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");

// DB
const Mentor = require("../../../model/v1/Mentor");

const validateMentor = require("../../../validators/mentor");

const {
  successWithData,
  successNoData,
} = require("../../../utils/successHandler");

// Error
const AppError = require("../../../utils/appError");

exports.createMentor = async (req, res, next) => {
  try {
    const { errors, isValid } = validateMentor(req.body);
    if (!isValid) {
      return AppError.validationError(res, BAD_REQUEST, errors);
    }
    let mentor = {
        ...req.body,
        user_id: req.user.id,
      };

    const newMentor= await Mentor.create(mentor);
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
      .populate("authorId", "-password")
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
      "authorId",
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
    const { errors, isValid } = validateMentor(req.body);
    if (!isValid) {
      return AppError.validationError(res, BAD_REQUEST, errors);
    }

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
