const { CREATED, UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");

// DB
const Capstone = require("../../../model/v1/Capstone");
const Mentorship = require("../../../model/v1/Mentorship");

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
      mentorship_id: req.params.mentorship_id,
    };
    const mentorship = await Mentorship.findById(req.params.mentorship_id);

    if (!mentorship) {
      console.log("no mentorship found");
      let error = { message: "undefined mentorship" };
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
      .populate("Mentorship")
      .sort("-createdAt");
    return successWithData(
      res,
      OK,
      "Capstones fetched successfully",
      capstones
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getCapstone = async (req, res, next) => {
  try {
    const capstones = await Capstone.find({
      mentorship_id: req.params.mentorship_id,
    })
      .populate("mentorship_id")
      .sort("-createdAt");
    if (!capstones) {
      let error = { message: "undefined capstone" };
      return AppError.tryCatchError(res, error);
    }
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

exports.updateCapstone = async (req, res, next) => {
  try {
    const capstoneUpdate = await Capstone.findById(req.params.capstone_id);
    if (!capstoneUpdate) {
      let error = { message: "undefined Capstone" };
      return AppError.tryCatchError(res, error);
    }

    let capstone = {
      ...req.body,
    };

    const modifiedCapstone = await Capstone.findOneAndUpdate(
      { _id: req.params.capstone_id },
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
    await Capstone.findOneAndDelete({ _id: req.params.capstone_id });
    return successNoData(res, OK, "Capstone deleted");
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};
