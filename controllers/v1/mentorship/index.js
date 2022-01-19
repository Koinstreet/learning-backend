const { CREATED, UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");

// DB
const Mentor = require("../../../model/v1/Mentor");
const Mentee = require("../../../model/v1/Mentee");
const Mentorship = require("../../../model/v1/Mentorship");
const Workshop = require("../../../model/v1/Workshop");
const Capstone = require("../../../model/v1/Capstone");
const MentorshipEvent = require("../../../model/v1/MentorshipEvent");
const MentorshipCourse = require("../../../model/v1/MentorshipCourse");
const MentorshipJob = require("../../../model/v1/MentorshipJob");
const Sprint = require("../../../model/v1/Sprint");
const Resources = require("../../../model/v1/Resources");
const User = require("../../../model/v1/User");

const {
  successWithData,
  successNoData
} = require("../../../utils/successHandler");

// Error
const AppError = require("../../../utils/appError");

exports.createMentorship = async (req, res, next) => {
  try {
    let mentorship = {
      ...req.body,
      mentor_id: req.body.mentor_id,
      mentee_id: req.body.mentee_id
    };

    const mentor = await Mentor.findById(req.body.mentor_id).populate(
      "user_id",
      "-password"
    );
    const mentee = await Mentee.findById(req.body.mentee_id).populate(
      "user_id",
      "-password"
    );
    if (!mentor) {
      console.log("no mentor found");
      let error = { message: "undefined mentor" };
      return AppError.tryCatchError(res, error);
    } else if (!mentee) {
      console.log("no mentee found");
      let error = { message: "undefined mentee" };
      return AppError.tryCatchError(res, error);
    }

    const newMentorship = await Mentorship.create(mentorship);

    return successWithData(
      res,
      CREATED,
      "Mentorship created successfully",
      newMentorship
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getAllMentorship = async (req, res, next) => {
  try {
    const mentorships = await Mentorship.find({})
      .populate("mentor_id")
      .populate("mentee_id")
      .sort("-createdAt");
    return successWithData(
      res,
      OK,
      "mentorship fetched successfully",
      mentorships
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getMentorship = async (req, res, next) => {
  try {
    const mentorships = await Mentorship.findById(req.params.id)
      .populate("mentor_id")
      .populate("mentee_id")
      .sort("-createdAt");
    if (!mentorships) {
      let error = { message: "undefined mentorship" };
      return AppError.tryCatchError(res, error);
    }
    return successWithData(
      res,
      OK,
      "Mentorship fetched successfully",
      mentorships
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.updateMentorship = async (req, res, next) => {
  try {
    const mentorshipUpdate = await Mentorship.findById(req.params.id);
    if (!mentorshipUpdate) {
      let error = { message: "undefined mentorship" };
      return AppError.tryCatchError(res, error);
    }

    let mentorship = {
      ...req.body
    };

    const modifiedMentorship = await Mentorship.findOneAndUpdate(
      { _id: req.params.id },
      { ...mentorship },
      { new: true }
    );
    return successWithData(res, OK, "Mentorship modified", modifiedMentorship);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.deleteMentorship = async (req, res, file) => {
  try {
    await Mentorship.findOneAndDelete({ _id: req.params.id });
    return successNoData(res, OK, "Mentorship deleted");
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getUserMentorship = async (req, res, next) => {
  try {
    let mentorship;
    const user = await User.findById(req.params.user_id);
    const mentor = await Mentor.find({
      user_id: req.params.user_id
    }).sort("-createdAt");
    const mentee = await Mentee.find({
      user_id: req.params.user_id
    }).sort("-createdAt");
    // console.log(mentee[0]);
    if (user.is_mentor) {
      mentorship = await Mentorship.find({
        mentor_id: mentor[0]._id
      })
        .populate({
          path: "mentor_id",
          populate: {
            path: "user_id"
          }
        })
        .populate({
          path: "mentee_id",
          populate: {
            path: "user_id"
          }
        });
    } else if (user.is_mentee) {
      mentorship = await Mentorship.find({
        mentee_id: mentee[0]._id
      })
        .populate({
          path: "mentor_id",
          populate: {
            path: "user_id"
          }
        })
        .populate({
          path: "mentee_id",
          populate: {
            path: "user_id"
          }
        });
      console.log(mentorship);
    } else {
      console.log("no user found");
      let error = { message: "undefined user" };
      return AppError.tryCatchError(res, error);
    }
    if (mentorship) {
      const workshops = await Workshop.find({
        mentorship_id: mentorship[0]._id
      }).sort("-createdAt");
      const capstones = await Capstone.find({
        mentorship_id: mentorship[0]._id
      }).sort("-createdAt");

      const mentorshipEvent = await MentorshipEvent.find({
        mentorship_id: mentorship[0]._id
      }).sort("-createdAt");

      const mentorshipCourse = await MentorshipCourse.find({
        mentorship_id: mentorship[0]._id
      }).sort("-createdAt");
      const mentorshipJob = await MentorshipJob.find({
        mentorship_id: mentorship[0]._id
      }).sort("-createdAt");
      const sprint = await Sprint.find({
        mentorship_id: mentorship[0]._id
      }).sort("-createdAt");
      const resource = await Resources.find({
        mentorship_id: mentorship[0]._id
      }).sort("-createdAt");

      return successWithData(res, OK, "Mentorship fetched successfully", {
        mentorship: mentorship[0],
        resource,
        sprint,
        mentorshipJob,
        mentorshipCourse,
        mentorshipEvent,
        capstones,
        workshops
      });
    } else {
      let error = { message: "undefined mentorship" };
      return AppError.tryCatchError(res, error);
    }
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};
