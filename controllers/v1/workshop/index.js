const { CREATED, UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");

// DB
const Workshop = require("../../../model/v1/Workshop");
const User = require("../../../model/v1/User");

const {
  successWithData,
  successNoData,
} = require("../../../utils/successHandler");

// Error
const AppError = require("../../../utils/appError");

exports.createWorkshop = async (req, res, next) => {
  try {
    let workshop = {
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

    const newWorkshop = await Workshop.create(workshop);

    return successWithData(
      res,
      CREATED,
      "Workshop created successfully",
      newWorkshop
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getAllWorkshop = async (req, res, next) => {
  try {
    const workshops = await Workshop.find({})
      .populate("mentors", "-password")
      .populate("mentees", "-password")
      .sort("-createdAt");
    return successWithData(
      res,
      OK,
      "workshops fetched successfully",
      workshops
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getWorkshop = async (req, res, next) => {
  try {
    const workshop = await Workshop.findById(req.params.id)
      .populate("mentors", "-password")
      .populate("mentees", "-password");
    if (!workshop) {
      let error = { message: "undefined workshop" };
      return AppError.tryCatchError(res, error);
    }
    return successWithData(res, OK, "workshop fetched successfully", workshop);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.updateWorkshop = async (req, res, next) => {
  try {
    const workshopUpdate = await Workshop.findById(req.params.id);
    if (!workshopUpdate) {
      let error = { message: "undefined Workshop" };
      return AppError.tryCatchError(res, error);
    }

    let workshop = {
      ...req.body,
    };

    const modifiedWorkshope = await Workshop.findOneAndUpdate(
      { _id: req.params.id },
      { ...workshop },
      { new: true }
    );
    return successWithData(res, OK, "Workshop modified", modifiedWorkshope);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.deleteWorkshop = async (req, res, file) => {
  try {
    await Workshop.findOneAndDelete({ _id: req.params.id });
    return successNoData(res, OK, "Workshop deleted");
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};
