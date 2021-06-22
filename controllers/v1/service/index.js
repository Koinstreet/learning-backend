const { CREATED, UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");

// DB
const Services = require("../../../model/v1/service");

const validateService = require("../../../validators/service");

const {
  successWithData,
  successNoData,
} = require("../../../utils/successHandler");

// Error
const AppError = require("../../../utils/appError");

exports.createService = async (req, res, next) => {
  try {
    const { errors, isValid } = validateService(req.body);
    if (!isValid) {
      return AppError.validationError(res, BAD_REQUEST, errors);
    }
    let service = {
        ...req.body,
      };

    const newService= await Services.create(service);
    return successWithData(
      res,
      CREATED,
      "Service created successfully",
      newService
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getAllServices= async (req, res, next) => {
  try {
    const services = await Services.find({})
      .populate("authorId", "-password")
      .sort("-createdAt");
    return successWithData(res, OK, "Services fetched successfully", services);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};


exports.getService = async (req, res, next) => {
  try {
    const service = await Services.findById(req.params.id).populate(
      "authorId",
      "-password"
    );
    if (!service) return AppError.tryCatchError(res, err);
    return successWithData(res, OK, "Service fetched successfully", service);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.updateService = async (req, res, next) => {
  
  try {
    const { errors, isValid } = validateService(req.body);
    if (!isValid) {
      return AppError.validationError(res, BAD_REQUEST, errors);
    }

    const serviceUpdate = await Services.findById(req.params.id);
    if (!serviceUpdate) return AppError.tryCatchError(res, err);

    let service = {
        ...req.body,
      };
    
    const modifiedService = await Services.findOneAndUpdate(
      { _id: req.params.id },
      { ...service },
      { new: true }
    );
    return successWithData(res, OK, "Service modified", modifiedService);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.deleteService = async (req, res, file) => {
  try {
    await Services.findOneAndDelete({ _id: req.params.id });
    return successNoData(res, OK, "Service deleted");
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};
