const { CREATED, UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");

// DB
const MentorshipEvent = require("../../../model/v1/MentorshipEvent");
const User = require("../../../model/v1/User");

const {
  successWithData,
  successNoData,
} = require("../../../utils/successHandler");

// Error
const AppError = require("../../../utils/appError");

exports.createMentorshipEvent = async (req, res, next) => {
  try {
    let mentorshipEvent = {
      ...req.body,
      speakers: req.body.speakers,
      audiences: req.body.audiences,
      status: false,
    };
    const speakers = await User.find({ _id: { $in: speakers } });
    const audiences = await User.find({ _id: { $in: audiences } });
    if (!speakers) {
      console.log("no speakers found");
      let error = { message: "undefined speaker" };
      return AppError.tryCatchError(res, error);
    } else if (!audiences) {
      console.log("no audiences found");
      let error = { message: "undefined audience" };
      return AppError.tryCatchError(res, error);
    }

    const newMentorshipEvent = await MentorshipEvent.create(mentorshipEvent);

    return successWithData(
      res,
      CREATED,
      "MentorshipEvent created successfully",
      newMentorshipEvent
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getAllMentorshipEvent = async (req, res, next) => {
  try {
    const mentorships = await MentorshipEvent.find({})
      .populate("speakers", "-password")
      .populate("audiences", "-password")
      .sort("-createdAt");
    return successWithData(
      res,
      OK,
      "MentorshipEvents fetched successfully",
      mentorships
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getMentorshipEvent = async (req, res, next) => {
  try {
    const mentorshipEvent = await MentorshipEvent.findById(req.params.id)
      .populate("speakers", "-password")
      .populate("audiences", "-password");
    if (!mentorshipEvent) {
      let error = { message: "undefined MentorshipEvent" };
      return AppError.tryCatchError(res, error);
    }
    return successWithData(
      res,
      OK,
      "MentorshipEvent fetched successfully",
      mentorshipEvent
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.updateMentorshipEvent = async (req, res, next) => {
  try {
    const mentorshipEventUpdate = await MentorshipEvent.findById(req.params.id);
    if (!mentorshipEventUpdate) {
      let error = { message: "undefined mentorshipEvent" };
      return AppError.tryCatchError(res, error);
    }

    let mentorshipEvent = {
      ...req.body,
    };

    const modifiedMentorshipEvent = await MentorshipEvent.findOneAndUpdate(
      { _id: req.params.id },
      { ...mentorshipEvent },
      { new: true }
    );
    return successWithData(
      res,
      OK,
      "Mentorship modified",
      modifiedMentorshipEvent
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.deleteMentorshipEvent = async (req, res, file) => {
  try {
    await MentorshipEvent.findOneAndDelete({ _id: req.params.id });
    return successNoData(res, OK, "MentorshipEvent deleted");
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};
