const { CREATED, UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");
const multer = require("multer");

// DB
const db = require("../DB/db");
const Course = db.courses;
const User = db.users;

const { validateCourse } = require("../validators");

const uploadImage = require("../utils/uploadImage");

// Error
const AppError = require("../utils/appError");
// Success
const AppSuccess = require("../utils/successHandler");

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
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else cb(new Error("invalid filetype"), false);
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadCourseImage = upload.single("image");

exports.createCourse = async (req, res, next) => {
  try {
    const { errors, isValid } = validateCourse(req.body);
    console.log(req.body)
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
        objectives: JSON.parse(req.body.objectives),
        image: data.url,
      };
    } else {
      course = {
        ...req.body,
        objectives: JSON.parse(req.body.objectives),
        authorId: req.user.id,
      };
    }

    const newCourse = await Course.create(course);
    res.status(201).json({
      status: CREATED,
      data: {
        course: newCourse,
      },
    });
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getAllCourse = async (req, res, next) => {
  try {
    const courses = await Course.findAll({
      include: [{ model: User, as: "author" }],
      order: [['createdAt', 'DESC']]
    });
    res.status(OK).json({
      status: "success",
      data: {
        courses: courses,
      },
    });
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getPublishedCourse = async (req, res, next) => {
  try {
    const courses = await Course.findAll({
      where: { published: true},
      include: [{ model: User, as: "author" }],
      order: [['createdAt', 'DESC']]
    });
    res.status(OK).json({
      status: "success",
      data: {
        courses: courses,
      },
    });
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getCourse = async (req, res, next) => {
  try {
    const course = await Course.findByPk(req.params.id, {include: [{ model: User, as: "author" }]});
    if(!course) return AppError.tryCatchError(res, err);
    res.status(OK).json({
      status: "success",
      data: {
        course
      },
    });
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
}

exports.updateCourse = async (req, res, next) => {
  try {
    const { errors, isValid } = validateCourse(req.body);
    if (!isValid) {
      return AppError.validationError(res, BAD_REQUEST, errors);
    }

    const courseUpdate = await Course.findByPk(req.params.id);
    if (!courseUpdate) return AppError.tryCatchError(res, err);
    let course;
    if (req.file) {
      const data = await uploadImage(req.file);
      if (!data.url || !data.public_id)
        return AppError.tryCatchError(this.res, err);
      course = {
        ...req.body,
        authorId: req.user.id,
        objectives: JSON.parse(req.body.objectives),
        image: data.url,
      };
    } else {
      course = {
        ...req.body,
        objectives: JSON.parse(req.body.objectives),
        authorId: req.user.id,
      };
    }
    const modifiedCourse = await Course.update(
      { ...course },
      { returning: true, where: { id: parseInt(req.params.id) } }
    );
    res.status(OK).json({
      status: OK,
      data: {
        course: modifiedCourse,
      },
    });
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.deletCourse = async (req, res, file) => {
  try {
    const course = await Course.destroy({
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
