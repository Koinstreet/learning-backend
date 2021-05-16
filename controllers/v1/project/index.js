const { CREATED, UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");

// DB
const Projects = require("../../../model/v1/Project");

const validateProject = require("../../../validators/project");

const {
  successWithData,
  successNoData,
} = require("../../../utils/successHandler");

// Error
const AppError = require("../../../utils/appError");

exports.createproject = async (req, res, next) => {
  try {
    const { errors, isValid } = validateProject(req.body);
    if (!isValid) {
      return AppError.validationError(res, BAD_REQUEST, errors);
    }
    let project = {
        ...req.body,
        authorId: req.user.id,
      };

    const newProject= await Projects.create(project);
    return successWithData(
      res,
      CREATED,
      "project created successfully",
      newProject
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getAllProjects= async (req, res, next) => {
  try {
    const projects = await Projects.find({})
      .populate("authorId", "-password")
      .sort("-createdAt");
    return successWithData(res, OK, "Projects fetched successfully", projects);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};


exports.getProject = async (req, res, next) => {
  try {
    const project = await Projects.findById(req.params.id).populate(
      "authorId",
      "-password"
    );
    if (!project) return AppError.tryCatchError(res, err);
    return successWithData(res, OK, "project fetched successfully", project);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.updateProject = async (req, res, next) => {
  
  try {
    const { errors, isValid } = validateProject(req.body);
    if (!isValid) {
      return AppError.validationError(res, BAD_REQUEST, errors);
    }

    const projectUpdate = await Projects.findById(req.params.id);
    if (!projectUpdate) return AppError.tryCatchError(res, err);

    let project = {
        ...req.body,
        authorId: req.user.id,
      };
    
    const modifiedProject = await Projects.findOneAndUpdate(
      { _id: req.params.id },
      { ...project },
      { new: true }
    );
    return successWithData(res, OK, "project modified", modifiedProject);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.deleteProject = async (req, res, file) => {
  try {
    await Projects.findOneAndDelete({ _id: req.params.id });
    return successNoData(res, OK, "Project deleted");
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};
