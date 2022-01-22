const { CREATED, UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");

// DB
const Experience = require("../../../model/v1/experience");
const validateExperience = require("../../../validators/experience");

const {
  successWithData,
  successNoData
} = require("../../../utils/successHandler");

const uploadImage = require("../../../utils/uploadImage");

// Error
const AppError = require("../../../utils/appError");

exports.createExperience = async (req, res, next) => {
  try {
    const { errors, isValid } = validateExperience(req.body);
    if (!isValid) {
      return AppError.validationError(res, BAD_REQUEST, errors);
    }

    let experience;
    if (req.file) {
      const data = await uploadImage(req.file);
      if (!data.url || !data.public_id) return AppError.tryCatchError(res, err);
      experience = {
        ...req.body,
        authorId: req.user.id,
        image: data.url
      };
    } else {
      experience = {
        ...req.body,
        authorId: req.user.id
      };
    }

    const newExperience = await Experience.create(experience);
    return successWithData(
      res,
      CREATED,
      "Experience created successfully",
      newExperience
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getAllExperience = async (req, res, next) => {
  try {
    const experience = await Experience.find({})
      .populate("authorId", "-password")
      .sort("-createdAt");
    return successWithData(
      res,
      OK,
      "all Experiences fetched successfully",
      experience
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getAllUserExperience = async (req, res, next) => {
  try {
    const experience = await Experience.find({
      authorId: req.user.id
    })
      .populate("authorId", "-password")
      .sort("-createdAt");
    return successWithData(
      res,
      OK,
      "user Experiences fetched successfully",
      experience
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getExperience = async (req, res, next) => {
  try {
    const experience = await Experience.findById(req.params.id).populate(
      "authorId",
      "-password"
    );
    if (!Experience) return AppError.tryCatchError(res, err);
    return successWithData(
      res,
      OK,
      "Experience fetched successfully",
      experience
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.updateExperience = async (req, res, next) => {
  try {
    const ExperienceUpdate = await Experience.findById(req.params.id);
    if (!ExperienceUpdate) return AppError.tryCatchError(res, err);

    let experience = {
      ...req.body,
      authorId: req.user.id
    };

    const modifiedExperience = await Experience.findOneAndUpdate(
      { _id: req.params.id },
      { ...experience },
      { new: true }
    );
    return successWithData(res, OK, "Experience modified", modifiedExperience);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.deleteExperience = async (req, res, file) => {
  try {
    await Experience.findOneAndDelete({ _id: req.params.id });
    return successNoData(res, OK, "Experience deleted");
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};
