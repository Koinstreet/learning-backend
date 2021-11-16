const { CREATED, UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");

// DB
const MentorshipCourse = require("../../../model/v1/MentorshipCourse");
const User = require("../../../model/v1/User");

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
      mentors: req.body.mentors,
      mentees: req.body.mentees,
      status: false,
    };
    const mentors = await User.find({ _id: { $in: mentors } });
    const mentees = await User.find({ _id: { $in: mentees } });
    if (!mentors) {
      console.log("no mentors found");
      let error = { message: "undefined mentors" };
      return AppError.tryCatchError(res, error);
    } else if (!mentees) {
      console.log("no mentees found");
      let error = { message: "undefined mentees" };
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
      .populate("mentors", "-password")
      .populate("mentees", "-password")
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
    const mentorshipCourse = await MentorshipCourse.findById(req.params.id)
      .populate("mentors", "-password")
      .populate("mentees", "-password");
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
      req.params.id
    );
    if (!mentorshipCourseUpdate) {
      let error = { message: "undefined MentorshipCourse" };
      return AppError.tryCatchError(res, error);
    }

    let mentorshipCourse = {
      ...req.body,
    };

    const modifiedMentorshipCoursee = await MentorshipCourse.findOneAndUpdate(
      { _id: req.params.id },
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
    await MentorshipCourse.findOneAndDelete({ _id: req.params.id });
    return successNoData(res, OK, "MentorshipCourse deleted");
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};
