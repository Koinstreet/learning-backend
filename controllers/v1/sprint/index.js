const { CREATED, UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");

// DB
const Mentorship = require("../../../model/v1/Mentorship");
const Sprint = require("../../../model/v1/Sprint");

const {
  successWithData,
  successNoData,
} = require("../../../utils/successHandler");

// Error
const AppError = require("../../../utils/appError");

exports.createSprint = async (req, res, next) => {
  try {
    let sprint = {
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
    const newSprint = await Sprint.create(sprint);

    return successWithData(
      res,
      CREATED,
      "Sprint created successfully",
      newSprint
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getAllSprint = async (req, res, next) => {
  try {
    const Sprints = await Sprint.find({})
      .populate("Mentorship")
      .sort("-createdAt");
    return successWithData(res, OK, "Sprints fetched successfully", Sprints);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getSprint = async (req, res, next) => {
  try {
    const sprint = await Sprint.find({
      mentorship_id: req.params.mentorship_id,
    })
      .populate("mentorship_id")
      .sort("-createdAt");
    if (!sprint) {
      let error = { message: "undefined Sprint" };
      return AppError.tryCatchError(res, error);
    }
    return successWithData(res, OK, "Sprint fetched successfully", sprint);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.updateSprint = async (req, res, next) => {
  try {
    const sprintUpdate = await Sprint.findById(req.params.sprint_id);
    if (!sprintUpdate) {
      let error = { message: "undefined Sprint" };
      return AppError.tryCatchError(res, error);
    }

    let sprint = {
      ...req.body,
    };

    const modifiedSprint = await Sprint.findOneAndUpdate(
      { _id: req.params.sprint_id },
      { ...sprint },
      { new: true }
    );
    return successWithData(res, OK, "Sprint modified", modifiedSprint);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.deleteSprint = async (req, res, file) => {
  try {
    await Sprint.findOneAndDelete({ _id: req.params.sprint_id });
    return successNoData(res, OK, "Sprint deleted");
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};
