const { CREATED, UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");

// DB
const Startup = require("../../../model/v1/Startups");

const validateStartup = require("../../../validators/startup");

const uploadImage = require("../../../utils/uploadImage");

const {
  successWithData,
  successNoData,
} = require("../../../utils/successHandler");

// Error
const AppError = require("../../../utils/appError");

exports.createStartup = async (req, res, next) => {
  try {
    const { errors, isValid } = validateStartup(req.body);
    if (!isValid) {
      return AppError.validationError(res, BAD_REQUEST, errors);
    }
    let startup;
    if (req.file) {
      const data = await uploadImage(req.file);
      if (!data.url || !data.public_id) return AppError.tryCatchError(res, err);
      startup = {
        ...req.body,
        startupOwner: req.user.id,
        startupImage: data.url,
      };
    } else {
        startup = {
        ...req.body,
        startupOwner: req.user.id,
      };
    }

    const newStartup = await Startup.create(startup);
    return successWithData(
      res,
      CREATED,
      "Startup created successfully",
      newStartup
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getAllStartup = async (req, res, next) => {
  try {
    const Startups = await Startup.find({})
      .populate("startupOwner", "-password")
      .sort("-createdAt");
    return successWithData(res, OK, "Startup fetched successfully", Startups);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getStartup = async (req, res, next) => {
  try {
    const Startup = await Startup.findById(req.params.id).populate(
      "startupOwner",
      "-password"
    );
    if (!Startup) return AppError.tryCatchError(res, err);
    return successWithData(res, OK, "Startup fetched successfully", Startup);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.updateStartup = async (req, res, next) => {
  
  try {
    const { errors, isValid } = validateStartup(req.body);
    if (!isValid) {
      return AppError.validationError(res, BAD_REQUEST, errors);
    }

    const StartupUpdate = await Startup.findById(req.params.id);
    if (!StartupUpdate) return AppError.tryCatchError(res, err);
    let startup;
    if (req.file) {
      const data = await uploadImage(req.file);
      if (!data.url || !data.public_id)
        return AppError.tryCatchError(this.res, err);
        startup = {
        ...req.body,
        startupOwner: req.user.id,
        startupImage: data.url,
      };
    } else {
        startup = {
        ...req.body,
        startupOwner: req.user.id,
      };
    }
    const modifiedStartup = await Startup.findOneAndUpdate(
      { _id: req.params.id },
      { ...startup },
      { new: true }
    );
    return successWithData(res, OK, "Startup modified", modifiedStartup);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.deleteStartup = async (req, res, file) => {
  try {
    await Startup.findOneAndDelete({ _id: req.params.id });
    return successNoData(res, OK, "startup deleted");
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};
