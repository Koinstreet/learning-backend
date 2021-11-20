const { CREATED, UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");

// DB
const Workshop = require("../../../model/v1/Workshop");
const Mentorship = require("../../../model/v1/Mentorship");

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
      mentorship_id: req.params.mentorship_id,
    };
    const mentorship = await Mentorship.findById(req.params.mentorship_id);

    if (!mentorship) {
      console.log("no mentorship found");
      let error = { message: "undefined mentorship" };
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
      .populate("Mentorship")
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
    const workshops = await Workshop.find({
      mentorship_id: req.params.mentorship_id,
    })
      .populate("mentorship_id")
      .sort("-createdAt");
    if (!workshops) {
      let error = { message: "undefined workshop" };
      return AppError.tryCatchError(res, error);
    }
    return successWithData(res, OK, "Workshop fetched successfully", workshops);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.updateWorkshop = async (req, res, next) => {
  try {
    const workshopUpdate = await Workshop.findById(req.params.workshop_id);
    if (!workshopUpdate) {
      let error = { message: "undefined Workshop" };
      return AppError.tryCatchError(res, error);
    }

    let workshop = {
      ...req.body,
    };

    const modifiedWorkshope = await Workshop.findOneAndUpdate(
      { _id: req.params.workshop_id },
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
    await Workshop.findOneAndDelete({ _id: req.params.workshop_id });
    return successNoData(res, OK, "Workshop deleted");
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};
