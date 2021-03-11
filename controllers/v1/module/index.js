const multer = require("multer");
const { CREATED, UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");

// DB
const Course = require("../../../model/v1/Course");
const User = require("../../../model/v1/User");
const Module = require("../../../model/v1/Module");
const ViewedCourse = require("../../../model/v1/ViewedCourse");

const { validateCourse, validateModule } = require("../../../validators");

const uploadImage = require("../../../utils/uploadImage");
const {
  successWithData,
  successNoData,
} = require("../../../utils/successHandler");

// Error
const AppError = require("../../../utils/appError");

exports.createModule = async (req, res, next) => {
  try {
    const { errors, isValid } = validateModule(req.body);
    if (!isValid) {
      return AppError.validationError(res, BAD_REQUEST, errors);
    }
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      errors.msg = "Invalid course";
      return AppError.validationError(res, BAD_REQUEST, errors);
    }
    const module = {
      ...req.body,
      authorId: req.user.id,
      courseId: req.params.courseId,
    };
    const newModule = await Module.create(module);
    return successWithData(res, CREATED, "Module created", newModule);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getCourseAllModule = async (req, res, next) => {
  try {
    const modules = await Module.find({ courseId: req.params.courseId }).sort(
      "createdAt"
    );
    if (!modules) {
      errors.msg = "Invalid course";
      return AppError.validationError(res, BAD_REQUEST, errors);
    }
    return successWithData(res, OK, "Courses", modules);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getModule = async (req, res, next) => {
  try {
    const module = await Module.findOne({
      _id: req.params.moduleId,
      courseId: req.params.courseId,
    });
    const errors = {};
    if (!module) {
      errors.msg = "Invalid module";
      return AppError.validationError(res, BAD_REQUEST, errors);
    }

    const viewedCourse = await ViewedCourse.findOneOrCreate({
      courseId: module.courseId,
      userId: req.user.id,
    });

    let viewedModules;
    let newModule = viewedCourse.viewedModules;
    if (viewedCourse.viewedModules.length < 1) {
      newModule.push(module._id);
    } else {
      let isModule = viewedCourse.viewedModules.includes(module._id);
      if (!isModule) {
        newModule = [...viewedCourse.viewedModules, module._id];
      }
    }
    const modules = await ViewedCourse.findOneAndUpdate(
      { courseId: module.courseId, userId: req.user.id },
      { viewedModules: newModule },
      {
        new: true,
      }
    );
    viewedModules = modules.viewedModules;

    return successWithData(res, OK, "Updated course viewed", {
      module,
      viewed: viewedModules,
    });
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.updateModule = async (req, res, next) => {
  console.log(req.params);
  console.log(req.body)
  try {
    const { errors, isValid } = validateModule(req.body);
    if (!isValid) {
      return AppError.validationError(res, BAD_REQUEST, errors);
    }
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      errors.msg = "Invalid course";
      return AppError.validationError(res, BAD_REQUEST, errors);
    }
    const updatedModule = await Module.findById(req.params.id);
    if (!updatedModule) {
      errors.msg = "Invalid module";
      return AppError.validationError(res, BAD_REQUEST, errors);
    }
    const newModule = await Module.findOneAndUpdate(
      { _id: req.params.id },
      { ...req.body },
      { new: true }
    );
    return successWithData(res, OK, "Updated course successfully", newModule);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.deleteModule = async (req, res, next) => {
  try {
    await Module.findByIdAndDelete(req.params.id);
    successNoData(res, OK, "Module deleted successfully");
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getViewedCourses = async (req, res, next) => {
  try {
    const viewedCourses = await ViewedCourse.find({ userId: req.user.id })
    .sort("-createdAt")
    .populate({
      path: "courseId",
      model: "Course",
      populate: {
        path: "authorId",
        model: "User"
      }
    })
    successWithData(res, OK, "All courses", viewedCourses);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};
