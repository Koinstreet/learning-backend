const { CREATED, UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");

// DB
const Mentorship = require("../../../model/v1/Mentorship");
const User = require("../../../model/v1/User");

const uploadImage = require("../../../utils/uploadImage");

const {
  successWithData,
  successNoData,
} = require("../../../utils/successHandler");

// Error
const AppError = require("../../../utils/appError");

exports.createMentorship = async (req, res, next) => {
  try {
    let mentorship;
    if (req.file) {
      const data = await uploadImage(req.file);
      if (!data.url || !data.public_id) return AppError.tryCatchError(res, err);
      mentorship = {
        ...req.body,
        qr_code: data.url,
        mentors: req.body.mentors,
        mentees: req.body.mentees,
      };
    } else {
      mentorship = {
        ...req.body,
        mentors: req.body.mentors,
        mentees: req.body.mentees,
      };
    }

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
      .populate("user_id", "-password")
      .populate("mentors", "-password")
      .populate("mentees", "-password")
      .populate("capstones")
      .populate("resume_workshops")
      .populate("events")
      .populate("courses")
      .populate("job_portals")
      .populate("resources")
      .populate("sprints")
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
      .populate("user_id", "-password")
      .populate("mentors", "-password")
      .populate("mentees", "-password")
      .populate("capstones")
      .populate("resume_workshops")
      .populate("events")
      .populate("courses")
      .populate("job_portals")
      .populate("resources")
      .populate("sprints")
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
      ...req.body,
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
