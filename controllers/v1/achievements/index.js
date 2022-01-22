const { CREATED, UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");

// DB
const Achievement = require("../../../model/v1/achievements");
const validatePersonalProject = require("../../../validators/PersonalProject");

const {
  successWithData,
  successNoData
} = require("../../../utils/successHandler");

// Error
const AppError = require("../../../utils/appError");

exports.createAchievement = async (req, res, next) => {
  try {
    const { errors, isValid } = validatePersonalProject(req.body);
    if (!isValid) {
      return AppError.validationError(res, BAD_REQUEST, errors);
    }
    let achievement = {
      ...req.body,
      authorId: req.user.id
    };

    const newAchievement = await Achievement.create(achievement);
    return successWithData(
      res,
      CREATED,
      "Achievement created successfully",
      newAchievement
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getAllAchievement = async (req, res, next) => {
  try {
    const achievement = await Achievement.find({}).sort("-createdAt");
    return successWithData(
      res,
      OK,
      "all Achievements fetched successfully",
      achievement
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getAllUserAchievement = async (req, res, next) => {
  try {
    const achievement = await Achievement.find({
      authorId: req.user.id
    }).sort("-createdAt");
    return successWithData(
      res,
      OK,
      "user Achievements fetched successfully",
      achievement
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getAchievement = async (req, res, next) => {
  try {
    const achievement = await Achievement.findById(req.params.id).populate(
      "authorId",
      "-password"
    );
    if (!achievement) return AppError.tryCatchError(res, err);
    return successWithData(
      res,
      OK,
      "Achievement fetched successfully",
      achievement
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.updateAchievement = async (req, res, next) => {
  try {
    const achievementUpdate = await Achievement.findById(req.params.id);
    if (!achievementUpdate) return AppError.tryCatchError(res, err);

    let achievement = {
      ...req.body,
      authorId: req.user.id
    };

    const modifiedAchievement = await Achievement.findOneAndUpdate(
      { _id: req.params.id },
      { ...achievement },
      { new: true }
    );
    return successWithData(
      res,
      OK,
      "Achievement modified",
      modifiedAchievement
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.deleteAchievement = async (req, res, file) => {
  try {
    await Achievement.findOneAndDelete({ _id: req.params.id });
    return successNoData(res, OK, "Achievement deleted");
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};
