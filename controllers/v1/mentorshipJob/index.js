const { CREATED, UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");

// DB
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
      status: false,
    };

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
    const mentorshipJobs = await MentorshipJob.find({}).sort("-createdAt");
    return successWithData(
      res,
      OK,
      "MentorshipJobs fetched successfully",
      mentorshipJobs
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getMentorshipJob = async (req, res, next) => {
  try {
    const mentorshipJob = await MentorshipJob.findById(req.params.id);
    return successWithData(
      res,
      OK,
      "MentorshipJob fetched successfully",
      mentorshipJob
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.updateMentorshipJob = async (req, res, next) => {
  try {
    const mentorshipJobUpdate = await MentorshipJob.findById(req.params.id);
    if (!mentorshipJobUpdate) {
      let error = { message: "undefined MentorshipJob" };
      return AppError.tryCatchError(res, error);
    }

    let job = {
      ...req.body,
    };

    const modifiedMentorshipJobe = await MentorshipJob.findOneAndUpdate(
      { _id: req.params.id },
      { ...job },
      { new: true }
    );
    return successWithData(
      res,
      OK,
      "MentorshipJob modified",
      modifiedMentorshipJobe
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.deleteMentorshipJob = async (req, res, file) => {
  try {
    await MentorshipJob.findOneAndDelete({ _id: req.params.id });
    return successNoData(res, OK, "MentorshipJob deleted");
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};
