const { CREATED, UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");

// DB
const PersonalProjects = require("../../../model/v1/PersonalProject");

const validatePersonalProject = require("../../../validators/PersonalProject");

const {
  successWithData,
  successNoData
} = require("../../../utils/successHandler");

// Error
const AppError = require("../../../utils/appError");

exports.createPersonalProject = async (req, res, next) => {
  try {
    const { errors, isValid } = validatePersonalProject(req.body);
    if (!isValid) {
      return AppError.validationError(res, BAD_REQUEST, errors);
    }

    let PersonalProject;
    if (req.file) {
      const data = await uploadImage(req.file);
      if (!data.url || !data.public_id) return AppError.tryCatchError(res, err);
      PersonalProject = {
        ...req.body,
        authorId: req.user.id,
        image: data.url
      };
    } else {
      PersonalProject = {
        ...req.body,
        authorId: req.user.id
      };
    }

    const newPersonalProject = await PersonalProjects.create(PersonalProject);
    return successWithData(
      res,
      CREATED,
      "PersonalProject created successfully",
      newPersonalProject
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getAllPersonalProjects = async (req, res, next) => {
  try {
    const personalProjects = await PersonalProjects.find({})
      .populate("authorId", "-password")
      .sort("-createdAt");
    return successWithData(
      res,
      OK,
      "all PersonalProjects fetched successfully",
      personalProjects
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getAllUserPersonalProjects = async (req, res, next) => {
  try {
    const personalProjects = await PersonalProjects.find({
      authorId: req.user.id
    })
      .populate("authorId", "-password")
      .sort("-createdAt");
    return successWithData(
      res,
      OK,
      "user PersonalProjects fetched successfully",
      personalProjects
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getPersonalProject = async (req, res, next) => {
  try {
    const personalProject = await PersonalProjects.findById(
      req.params.id
    ).populate("authorId", "-password");
    if (!PersonalProject) return AppError.tryCatchError(res, err);
    return successWithData(
      res,
      OK,
      "PersonalProject fetched successfully",
      personalProject
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.updatePersonalProject = async (req, res, next) => {
  try {
    const PersonalProjectUpdate = await PersonalProjects.findById(
      req.params.id
    );
    if (!PersonalProjectUpdate) return AppError.tryCatchError(res, err);

    let personalProject = {
      ...req.body,
      authorId: req.user.id
    };

    const modifiedPersonalProject = await PersonalProjects.findOneAndUpdate(
      { _id: req.params.id },
      { ...personalProject },
      { new: true }
    );
    return successWithData(
      res,
      OK,
      "PersonalProject modified",
      modifiedPersonalProject
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.deletePersonalProject = async (req, res, file) => {
  try {
    await PersonalProjects.findOneAndDelete({ _id: req.params.id });
    return successNoData(res, OK, "PersonalProject deleted");
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};
