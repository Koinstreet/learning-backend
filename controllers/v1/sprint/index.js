const { CREATED, UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");

// DB
const Sprint = require("../../../model/v1/Sprint");
const User = require("../../../model/v1/User");

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
      .populate("mentors", "-password")
      .populate("mentees", "-password")
      .sort("-createdAt");
    return successWithData(res, OK, "Sprints fetched successfully", Sprints);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getSprint = async (req, res, next) => {
  try {
    const sprint = await Sprint.findById(req.params.id)
      .populate("mentors", "-password")
      .populate("mentees", "-password");
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
    const sprintUpdate = await Sprint.findById(req.params.id);
    if (!sprintUpdate) {
      let error = { message: "undefined Sprint" };
      return AppError.tryCatchError(res, error);
    }

    let sprint = {
      ...req.body,
    };

    const modifiedSprint = await Sprint.findOneAndUpdate(
      { _id: req.params.id },
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
    await Sprint.findOneAndDelete({ _id: req.params.id });
    return successNoData(res, OK, "Sprint deleted");
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};
