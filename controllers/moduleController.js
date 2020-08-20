const multer = require("multer");
const { CREATED, UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");

// DB
const db = require("../DB/db");
const Course = db.courses;
const Module = db.modules;
const User = db.users;
const ViewedCourse = db.viewedcourses;

// Error
const AppError = require("../utils/appError");
// Success
const AppSuccess = require("../utils/successHandler");
// Save
const ModuleSave = require("../utils/moduleSaveHandler");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${new Date().toISOString().replace(/[\/\\:]/g, "_")}-${
        file.originalname
      }`
    );
  },
});

const multerFilter = (req, file, cb) => {
  console.log(file.mimetype);
  if (file.mimetype.startsWith("video")) {
    cb(null, true);
  } else cb(new Error("invalid filetype"), false);
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const { validateModule } = require("../validators");

exports.uploadModuleVideo = upload.single("video");

exports.getModule = async (req, res, next) => {
  try {
    const module = await Module.findOne({
      where: { moduleId: req.params.moduleId, courseId: req.params.courseId },
    });
    if (!module) {
      errors.msg = "Invalid module";
      return AppError.validationError(res, BAD_REQUEST, errors);
    }

    const viewedCourse = await ViewedCourse.findOrCreate({
      where: { courseId: module.courseId, userId: req.user.id },
    });

    const viewed = JSON.stringify(viewedCourse);
    const formatedViewed = JSON.parse(viewed);

    let viewedModules;
    if (!formatedViewed[0].viewedModules) {
      let newModule = [];
      newModule.push(module.moduleId);
      const modules = await ViewedCourse.update(
        { viewedModules: newModule },
        {
          returning: true,
          where: { courseId: module.courseId, userId: req.user.id },
        }
      );
      newModule = JSON.stringify(modules);
      const newMod = JSON.parse(newModule);
      viewedModules = newMod[1][0].viewedModules;
    } else {
      let isModule = formatedViewed[0].viewedModules.includes(module.moduleId);
      if (isModule) {
        viewedModules = formatedViewed[0].viewedModules;
      } else {
        let modules = [...formatedViewed[0].viewedModules, module.moduleId];
        const updatedModules = await ViewedCourse.update(
          { viewedModules: modules },
          {
            returning: true,
            where: { courseId: module.courseId, userId: req.user.id },
          }
        );
        modules = JSON.stringify(updatedModules);
        const newMod = JSON.parse(modules);
        viewedModules = newMod[1][0].viewedModules;
      }
    }

    res.status(OK).json({
      status: "success",
      data: {
        module,
        viewed: viewedModules,
      },
    });
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getCourseAllModule = async (req, res, next) => {
  try {
    const modules = await Module.findAll({
      where: { courseId: req.params.courseId },
      order: [["createdAt", "ASC"]],
    });
    if (!modules) {
      errors.msg = "Invalid course";
      return AppError.validationError(res, BAD_REQUEST, errors);
    }
    res.status(OK).json({
      status: "success",
      data: {
        modules,
      },
    });
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.createModule = async (req, res, next) => {
  try {
    const { errors, isValid } = validateModule(req.body);
    if (!isValid) {
      return AppError.validationError(res, BAD_REQUEST, errors);
    }
    const course = await Course.findByPk(req.params.courseId);
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
    res.status(CREATED).json({
      status: "success",
      data: {
        module: newModule,
      },
    });
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.updateModule = async (req, res, next) => {
  try {
    const { errors, isValid } = validateModule(req.body);
    if (!isValid) {
      return AppError.validationError(res, BAD_REQUEST, errors);
    }
    const course = await Course.findByPk(req.params.courseId);
    if (!course) {
      errors.msg = "Invalid course";
      return AppError.validationError(res, BAD_REQUEST, errors);
    }
    const updatedModule = await Module.findByPk(req.params.id);
    if (!updatedModule) {
      errors.msg = "Invalid module";
      return AppError.validationError(res, BAD_REQUEST, errors);
    }

    const module = {
      ...req.body,
      authorId: req.user.id,
      courseId: req.params.courseId,
    };
    const newModule = await Module.update(
      { ...module },
      { returning: true, where: { id: parseInt(req.params.id) } }
    );
    res.status(CREATED).json({
      status: "success",
      data: {
        module: newModule,
      },
    });
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.deleteModule = async (req, res, next) => {
  try {
    const module = await Module.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(OK).json({
      status: OK,
    });
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getViewedCourses = async (req, res, next) => {
  try {
    const viewedCourses = await ViewedCourse.findAll({
      include: [{ model: Course, as: "course" }],
      // include: [{ model: User, as: "author" }],
      where: { userId: req.user.id },
      order: [["createdAt", "ASC"]],
    });
    res.status(OK).json({
      status: OK,
      courses: viewedCourses
    });
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
}