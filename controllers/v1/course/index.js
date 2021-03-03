const { CREATED, UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");

// DB
const Course = require("../../../model/v1/Course");

const { validateCourse } = require("../../../validators");

const uploadImage = require("../../../utils/uploadImage");
const {
  successWithData,
  successNoData,
} = require("../../../utils/successHandler");

// Error
const AppError = require("../../../utils/appError");

exports.createCourse = async (req, res, next) => {
  try {
    const { errors, isValid } = validateCourse(req.body);
    if (!isValid) {
      return AppError.validationError(res, BAD_REQUEST, errors);
    }
    let course;
    if (req.file) {
      const data = await uploadImage(req.file);
      if (!data.url || !data.public_id) return AppError.tryCatchError(res, err);
      course = {
        ...req.body,
        authorId: req.user.id,
        image: data.url,
      };
    } else {
      course = {
        ...req.body,
        authorId: req.user.id,
      };
    }

    const newCourse = await Course.create(course);
    return successWithData(
      res,
      CREATED,
      "Course created successfully",
      newCourse
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getAllCourse = async (req, res, next) => {
  try {
    const courses = await Course.find({})
      .populate("authorId", "-password")
      .sort("-createdAt");
    return successWithData(res, OK, "Course fetched successfully", courses);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getPublishedCourse = async (req, res, next) => {
  try {
    const courses = await Course.find({
      published: true,
    })
      .populate("authorId", "-password")
      .sort("-createdAt");
    return successWithData(res, OK, "Course fetched successfully", courses);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id).populate(
      "authorId",
      "-password"
    );
    if (!course) return AppError.tryCatchError(res, err);
    return successWithData(res, OK, "Course fetched successfully", course);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.updateCourse = async (req, res, next) => {
  try {
    const { errors, isValid } = validateCourse(req.body);
    if (!isValid) {
      return AppError.validationError(res, BAD_REQUEST, errors);
    }

    const courseUpdate = await Course.findById(req.params.id);
    if (!courseUpdate) return AppError.tryCatchError(res, err);
    let course;
    if (req.file) {
      const data = await uploadImage(req.file);
      if (!data.url || !data.public_id)
        return AppError.tryCatchError(this.res, err);
      course = {
        ...req.body,
        authorId: req.user.id,
        image: data.url,
      };
    } else {
      course = {
        ...req.body,
        authorId: req.user.id,
      };
    }
    const modifiedCourse = await Course.findOneAndUpdate(
      { _id: req.params.id },
      { ...course },
      { new: true }
    );
    return successWithData(res, OK, "Course modified", modifiedCourse);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.deleteCourse = async (req, res, file) => {
  try {
    Course.findOneAndDelete({ _id: req.params.id });
    return successNoData(res, OK, "resource deleted");
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};
