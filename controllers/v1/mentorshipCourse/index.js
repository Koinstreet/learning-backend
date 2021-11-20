const { CREATED, UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");

// DB
const MentorshipCourse = require("../../../model/v1/MentorshipCourse");
const Mentorship = require("../../../model/v1/Mentorship");

const {
  successWithData,
  successNoData,
} = require("../../../utils/successHandler");

// Error
const AppError = require("../../../utils/appError");

exports.createMentorshipCourse = async (req, res, next) => {
  try {
    let course = {
      ...req.body,
      mentorship_id: req.params.mentorship_id,
      status: false,
    };
    const mentorship = await Mentorship.findById(req.params.mentorship_id);

    if (!mentorship) {
      console.log("no mentorship found");
      let error = { message: "undefined mentorship" };
      return AppError.tryCatchError(res, error);
    }

    const newMentorshipCourse = await MentorshipCourse.create(course);

    return successWithData(
      res,
      CREATED,
      "MentorshipCourse created successfully",
      newMentorshipCourse
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getAllMentorshipCourse = async (req, res, next) => {
  try {
    const mentorshipCourses = await MentorshipCourse.find({})
      .populate("Mentorship")
      .sort("-createdAt");
    return successWithData(
      res,
      OK,
      "MentorshipCourses fetched successfully",
      mentorshipCourses
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getMentorshipCourse = async (req, res, next) => {
  try {
    const mentorshipCourse = await MentorshipCourse.find({
      mentorship_id: req.params.mentorship_id,
    })
      .populate("mentorship_id")
      .sort("-createdAt");
    if (!mentorshipCourse) {
      let error = { message: "undefined MentorshipCourse" };
      return AppError.tryCatchError(res, error);
    }
    return successWithData(
      res,
      OK,
      "MentorshipCourse fetched successfully",
      mentorshipCourse
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.updateMentorshipCourse = async (req, res, next) => {
  try {
    const mentorshipCourseUpdate = await MentorshipCourse.findById(
      req.params.course_id
    );
    if (!mentorshipCourseUpdate) {
      let error = { message: "undefined MentorshipCourse" };
      return AppError.tryCatchError(res, error);
    }

    let mentorshipCourse = {
      ...req.body,
    };

    const modifiedMentorshipCoursee = await MentorshipCourse.findOneAndUpdate(
      { _id: req.params.course_id },
      { ...mentorshipCourse },
      { new: true }
    );
    return successWithData(
      res,
      OK,
      "MentorshipCourse modified",
      modifiedMentorshipCoursee
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.deleteMentorshipCourse = async (req, res, file) => {
  try {
    await MentorshipCourse.findOneAndDelete({ _id: req.params.course_id });
    return successNoData(res, OK, "MentorshipCourse deleted");
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};
