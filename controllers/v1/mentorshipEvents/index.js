const { CREATED, UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");

// DB
const MentorshipEvent = require("../../../model/v1/MentorshipEvent");
const Mentorship = require("../../../model/v1/Mentorship");

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
      mentorship_id: req.params.mentorship_id,
      status: false,
    };
    const mentorship = await Mentorship.findById(req.params.mentorship_id);

    if (!mentorship) {
      console.log("no mentorship found");
      let error = { message: "undefined mentorship" };
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
      .populate("Mentorship")
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
    const mentorshipEvent = await MentorshipEvent.find({
      mentorship_id: req.params.mentorship_id,
    })
      .populate("mentorship_id")
      .sort("-createdAt");
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
    const mentorshipEventUpdate = await MentorshipEvent.findById(
      req.params.event_id
    );
    if (!mentorshipEventUpdate) {
      let error = { message: "undefined mentorshipEvent" };
      return AppError.tryCatchError(res, error);
    }

    let mentorshipEvent = {
      ...req.body,
    };

    const modifiedMentorshipEvent = await MentorshipEvent.findOneAndUpdate(
      { _id: req.params.event_id },
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
    await MentorshipEvent.findOneAndDelete({ _id: req.params.event_id });
    return successNoData(res, OK, "MentorshipEvent deleted");
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};
