const { CREATED, UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");

// DB
const Mentorship = require("../../../model/v1/Mentorship");
const MentorshipJob = require("../../../model/v1/MentorshipJob");

const {
  successWithData,
  successNoData,
} = require("../../../utils/successHandler");

// Error
const AppError = require("../../../utils/appError");

exports.createMentorshipJob = async (req, res, next) => {
  try {
    let job = {
      ...req.body,
      mentorship_id: req.params.mentorship_id,
    };
    const mentorship = await Mentorship.findById(req.params.mentorship_id);

    if (!mentorship) {
      console.log("no mentorship found");
      let error = { message: "undefined mentorship" };
      return AppError.tryCatchError(res, error);
    }

    const newMentorshipJob = await MentorshipJob.create(job);

    return successWithData(
      res,
      CREATED,
      "MentorshipJob created successfully",
      newMentorshipJob
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getAllMentorshipJobs = async (req, res, next) => {
  try {
    const mentorshipJob = await MentorshipJob.find({})
      .populate("Mentorship")
      .sort("-createdAt");
    return successWithData(
      res,
      OK,
      "MentorshipJobs fetched successfully",
      mentorshipJob
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getMentorshipJob = async (req, res, next) => {
  try {
    const mentorshipJob = await MentorshipJob.find({
      mentorship_id: req.params.mentorship_id,
    })
      .populate("mentorship_id")
      .sort("-createdAt");
    if (!mentorshipJob) {
      let error = { message: "undefined MentorshipJob" };
      return AppError.tryCatchError(res, error);
    }
    return successWithData(
      res,
      OK,
      "MentorshipJobs fetched successfully",
      mentorshipJob
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.updateMentorshipJob = async (req, res, next) => {
  try {
    const mentorshipJobUpdate = await MentorshipJob.findById(req.params.job_id);
    if (!mentorshipJobUpdate) {
      let error = { message: "undefined MentorshipJob" };
      return AppError.tryCatchError(res, error);
    }

    let job = {
      ...req.body,
    };

    const modifiedMentorshipJob = await MentorshipJob.findOneAndUpdate(
      { _id: req.params.job_id },
      { ...job },
      { new: true }
    );
    return successWithData(
      res,
      OK,
      "MentorshipJob modified",
      modifiedMentorshipJob
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};
exports.deleteMentorshipJob = async (req, res, file) => {
  try {
    await MentorshipJob.findOneAndDelete({ _id: req.params.job_id });
    return successNoData(res, OK, "MentorshipJob deleted");
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};
