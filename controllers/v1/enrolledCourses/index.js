const { CREATED, UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");
import sendEmail from '../../../utils/email/sendEmail';
import emailTemplate from '../../../utils/email/learn/enrollCourse';
import emailTemplate2 from '../../../utils/email/learn/finishCourse';

// DB
const EnrolledCourse = require("../../../model/v1/enrolledCourse");
const Course = require("../../../model/v1/Course");


// Validation
const validateEnrolledCourse = require("../../../validators/enrolledCourses");

const {
  successWithData,
  successNoData,
} = require("../../../utils/successHandler");

// Error
const AppError = require("../../../utils/appError");

exports.createEnrolledCourse = async (req, res, next) => {
  const { errors, isValid } = validateEnrolledCourse(req.body);
  try {
    let enrolledCourse = {
        ...req.body,
        courseId: req.body.courseId,
        user_id : req.user.id,
      };

      const findCourse = await Course.findById(req.body.courseId).populate(
        "_id"
      );
    if (!findCourse) {
    console.log('no course found')
    errors.msg = "Invalid course";
    return AppError.validationError(res, BAD_REQUEST, errors);
    }

    const EnrolledCourses = await EnrolledCourse.find({user_id: req.user.id}).sort("-createdAt");

    EnrolledCourses.map((saved) => {
      if ((saved.courseId).toString() === (req.body.courseId).toString()){
      errors.msg = "Already enrolled in this course";
      return AppError.validationError(res, UNAUTHORIZED, errors);
      }
    })

    const newEnrolledCourse= await EnrolledCourse.create(enrolledCourse);

    const subject = 'Successfully enrolled in course!';
    sendEmail(emailTemplate(req.user.firstName, findCourse.image, findCourse.name, findCourse.description), subject, req.user.email);


    return successWithData(
      res,
      CREATED,
      "user enrolled successfully",
      newEnrolledCourse
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getAllEnrolledCourse= async (req, res, next) => {
  try {
    const EnrolledCourses = await EnrolledCourse.find({}).populate("user_id").populate("courseId").sort("-createdAt");
    return successWithData(res, OK, "EnrolledCourses fetched successfully", EnrolledCourses);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getUserEnrolledCourse = async (req, res, next) => {
  try {
    const EnrolledCourses = await EnrolledCourse.find({user_id : req.user.id}).populate("user_id").populate("courseId").sort("-createdAt");
    if (!EnrolledCourses) { let error = {message: "you have no courses"}; return AppError.tryCatchError(res, error);}
    return successWithData(res, OK, "user enrolled courses fetched successfully", EnrolledCourses);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};


exports.getEnrolledCourse = async (req, res, next) => {
  try {
    const EnrolledCourses = await EnrolledCourse.findById(req.params.id).populate("user_id").populate("courseId").sort("-createdAt");
    if (!EnrolledCourses) { let error = {message: "undefined enrolled Course"}; return AppError.tryCatchError(res, error);}
    return successWithData(res, OK, "EnrolledCourse fetched successfully", EnrolledCourses);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.updateEnrolledCourse = async (req, res, next) => {
  try {
    const EnrolledCourseUpdate = await EnrolledCourse.findById(req.params.id);
    if (!EnrolledCourseUpdate) { let error = {message: "undefined enrolled course"}; return AppError.tryCatchError(res, error);}


    let enrolledCourse = {
        ...req.body,
      };
    
    const modifiedEnrolledCourse = await EnrolledCourse.findOneAndUpdate(
      { _id: req.params.id },
      { ...enrolledCourse },
      { new: true }
    );

    if (modifiedEnrolledCourse.completed === true){
        const findCourse= await Course.findById(modifiedEnrolledCourse.courseId);
        if (!findCourse) {
            console.log('no course found')
            let error = {message: "undefined course"}; return AppError.tryCatchError(res, error);
            }
        
        const subject = 'Successfully Completed course!';
        sendEmail(emailTemplate2(req.user.firstName, findCourse.image, findCourse.name, findCourse.description), subject, req.user.email);
    }

    return successWithData(res, OK, "EnrolledCourse modified", modifiedEnrolledCourse);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.deleteEnrolledCourse = async (req, res, file) => {
  try {
    const course = await EnrolledCourse.findOneAndDelete({ _id: req.params.id });
    if (!course) { let error = {message: "undefined enrolled course"}; return AppError.tryCatchError(res, error);}
    return successNoData(res, OK, "Enrolled Course deleted");
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};
