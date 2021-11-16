const { CREATED, UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");

// DB
const Capstone = require("../../../model/v1/Capstone");
const User = require("../../../model/v1/User");

const {
  successWithData,
  successNoData,
} = require("../../../utils/successHandler");

// Error
const AppError = require("../../../utils/appError");

exports.createCapstone = async (req, res, next) => {
  try {
    let capstone = {
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

    const newCapstone = await Capstone.create(capstone);

    return successWithData(
      res,
      CREATED,
      "Capstone created successfully",
      newCapstone
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getAllCapstone = async (req, res, next) => {
  try {
    const capstones = await Capstone.find({})
      .populate("mentors", "-password")
      .populate("mentees", "-password")
      .sort("-createdAt");
    return successWithData(
      res,
      OK,
      "capstones fetched successfully",
      capstones
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getCapstone = async (req, res, next) => {
  try {
    const capstone = await Capstone.findById(req.params.id)
      .populate("mentors", "-password")
      .populate("mentees", "-password");
    if (!capstone) {
      let error = { message: "undefined Capstone" };
      return AppError.tryCatchError(res, error);
    }
    return successWithData(res, OK, "capstone fetched successfully", capstone);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.updateCapstone = async (req, res, next) => {
  try {
    const capstoneUpdate = await Capstone.findById(req.params.id);
    if (!capstoneUpdate) {
      let error = { message: "undefined Capstone" };
      return AppError.tryCatchError(res, error);
    }

    let capstone = {
      ...req.body,
    };

    const modifiedCapstone = await Capstone.findOneAndUpdate(
      { _id: req.params.id },
      { ...capstone },
      { new: true }
    );
    return successWithData(res, OK, "Capstone modified", modifiedCapstone);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.deleteCapstone = async (req, res, file) => {
  try {
    await Capstone.findOneAndDelete({ _id: req.params.id });
    return successNoData(res, OK, "Capstone deleted");
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};
