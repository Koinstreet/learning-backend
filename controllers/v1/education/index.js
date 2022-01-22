const { CREATED, UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");

// DB
const Education = require("../../../model/v1/education");
const validateEducation = require("../../../validators/Education");

const uploadImage = require("../../../utils/uploadImage");

const {
  successWithData,
  successNoData
} = require("../../../utils/successHandler");

// Error
const AppError = require("../../../utils/appError");

exports.createEducation = async (req, res, next) => {
  try {
    const { errors, isValid } = validateEducation(req.body);
    if (!isValid) {
      return AppError.validationError(res, BAD_REQUEST, errors);
    }

    let education;
    if (req.file) {
      const data = await uploadImage(req.file);
      if (!data.url || !data.public_id) return AppError.tryCatchError(res, err);
      education = {
        ...req.body,
        authorId: req.user.id,
        image: data.url
      };
    } else {
      education = {
        ...req.body,
        authorId: req.user.id
      };
    }

    const newEducation = await Education.create(education);
    return successWithData(
      res,
      CREATED,
      "Education created successfully",
      newEducation
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getAllEducation = async (req, res, next) => {
  try {
    const education = await Education.find({}).sort("-createdAt");
    return successWithData(
      res,
      OK,
      "all Educations fetched successfully",
      education
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getAllUserEducation = async (req, res, next) => {
  try {
    const education = await Education.find({
      authorId: req.user.id
    }).sort("-createdAt");
    return successWithData(
      res,
      OK,
      "user Educations fetched successfully",
      education
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getEducation = async (req, res, next) => {
  try {
    const education = await Education.findById(req.params.id).populate(
      "authorId",
      "-password"
    );
    if (!education) return AppError.tryCatchError(res, err);
    return successWithData(
      res,
      OK,
      "Education fetched successfully",
      education
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.updateEducation = async (req, res, next) => {
  try {
    const educationUpdate = await Education.findById(req.params.id);
    if (!educationUpdate) return AppError.tryCatchError(res, err);

    let education = {
      ...req.body,
      authorId: req.user.id
    };

    const modifiedEducation = await Education.findOneAndUpdate(
      { _id: req.params.id },
      { ...education },
      { new: true }
    );
    return successWithData(res, OK, "Education modified", modifiedEducation);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.deleteEducation = async (req, res, file) => {
  try {
    await Education.findOneAndDelete({ _id: req.params.id });
    return successNoData(res, OK, "Education deleted");
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};
