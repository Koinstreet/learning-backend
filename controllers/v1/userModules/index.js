const { CREATED, UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");

// DB
const UserModules = require("../../../model/v1/userModules");
const Module = require("../../../model/v1/Module");
const Course = require("../../../model/v1/Course");

// Validation
const validateUserModules = require("../../../validators/userModules");

const {
  successWithData,
  successNoData,
} = require("../../../utils/successHandler");

// Error
const AppError = require("../../../utils/appError");

exports.createUserModule = async (req, res, next) => {
  const { errors, isValid } = validateUserModules(req.body);
  try {

    const course = await Course.findById(req.params.courseId);
    if (!course) {
      errors.msg = "Invalid course";
      return AppError.validationError(res, BAD_REQUEST, errors);
    }

    const findModule = await Module.findById(req.body.moduleId).populate(
        "_id"
      );
    if (!findModule) {
    console.log('no Module found')
    errors.msg = "Invalid Module";
    return AppError.validationError(res, BAD_REQUEST, errors);
    }

    if ((findModule.courseId).toString() !== (req.params.courseId).toString()) {
        console.log('Module does not belong to that course')
        errors.msg = "Invalid Module";
        return AppError.validationError(res, BAD_REQUEST, errors);
    }

    let userModules = {
        ...req.body,
        moduleId: req.body.moduleId,
        user_id : req.user.id,
      };

    const UserModuless = await UserModules.find({user_id: req.user.id}).sort("-createdAt");

    UserModuless.map((saved) => {
      if ((saved.moduleId).toString() === (req.body.moduleId).toString()){
      errors.msg = "Already enrolled in this Module";
      return AppError.validationError(res, UNAUTHORIZED, errors);
      }
    })

    const newUserModules= await UserModules.create(userModules);

    return successWithData(
      res,
      CREATED,
      "user module created successfully",
      newUserModules
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getAllUserModules= async (req, res, next) => {
  try {
    const UserModuless = await UserModules.find({}).populate("user_id").populate("moduleId").sort("-createdAt");
    return successWithData(res, OK, "UserModuless fetched successfully", UserModuless);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getUserUserModules = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
        let error = {message: "undefined course"}; return AppError.tryCatchError(res, error);
    }
    const UserModuless = await UserModules.find({user_id : req.user.id}).populate("user_id").populate("moduleId").sort("-createdAt");
    if (!UserModuless) { let error = {message: "you have no Modules"}; return AppError.tryCatchError(res, error);}
    return successWithData(res, OK, "user modules fetched successfully", UserModuless);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};


exports.getUserModule = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
        let error = {message: "undefined course"}; return AppError.tryCatchError(res, error);
    }
    const UserModuless = await UserModules.findById(req.params.id).populate("user_id").populate("moduleId").sort("-createdAt");
    if (!UserModuless) { let error = {message: "undefined user Module"}; return AppError.tryCatchError(res, error);}
    return successWithData(res, OK, "User Modules fetched successfully", UserModuless);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.updateUserModules = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
        let error = {message: "undefined course"}; return AppError.tryCatchError(res, error);
    }

    const findModule = await Module.findById(req.params.moduleId).populate(
        "_id"
      );
    if (!findModule) {
    console.log('no Module found')
    let error = {message: "undefined user Module"}; return AppError.tryCatchError(res, error);
    }

    const UserModulesUpdate = await UserModules.findById(req.params.id);
    if (!UserModulesUpdate) { let error = {message: "undefined enrolled Module"}; return AppError.tryCatchError(res, error);}


    let userModules = {
        ...req.body,
      };
    
    const modifiedUserModules = await UserModules.findOneAndUpdate(
      { _id: req.params.id },
      { ...userModules },
      { new: true }
    );
    return successWithData(res, OK, "User Module modified", modifiedUserModules);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.deleteUserModule = async (req, res, file) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
        let error = {message: "undefined course"}; return AppError.tryCatchError(res, error);
    }
    
    const findModule = await Module.findById(req.params.moduleId).populate(
        "_id"
      );
    if (!findModule) {
    console.log('no Module found')
    let error = {message: "undefined user Module"}; return AppError.tryCatchError(res, error);
    }
    const module = await UserModules.findOneAndDelete({ _id: req.params.id });
    if (!module) { let error = {message: "undefined user Module"}; return AppError.tryCatchError(res, error);}
    return successNoData(res, OK, "user Module deleted");
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};
