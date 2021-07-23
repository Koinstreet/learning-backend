const { CREATED, UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");

// DB
const Jobs = require("../../../model/v1/Jobs");

const validateJob = require("../../../validators/job");

const {
  successWithData,
  successNoData,
} = require("../../../utils/successHandler");

// Error
const AppError = require("../../../utils/appError");

exports.createJob = async (req, res, next) => {
  try {
    const { errors, isValid } = validateJob(req.body);
    if (!isValid) {
      return AppError.validationError(res, BAD_REQUEST, errors);
    }
    let job = {
        ...req.body,
        authorId: req.user.id,
      };

    const newJob= await Jobs.create(job);
    return successWithData(
      res,
      CREATED,
      "Job created successfully",
      newJob
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getAllJobs= async (req, res, next) => {
  try {
    const jobs = await Jobs.find({})
      .populate("authorId", "-password")
      .sort("-createdAt");
    return successWithData(res, OK, "Jobs fetched successfully", jobs);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};


exports.getJob = async (req, res, next) => {
  try {
    const job = await Jobs.findById(req.params.id).populate(
      "authorId",
      "-password"
    );
    if (!job) { let error = {message: "undefined job"}; return AppError.tryCatchError(res, error);}
    return successWithData(res, OK, "Job fetched successfully", job);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.updateJob = async (req, res, next) => {
  
  try {
    const { errors, isValid } = validateJob(req.body);
    if (!isValid) {
      return AppError.validationError(res, BAD_REQUEST, errors);
    }

    const jobUpdate = await Jobs.findById(req.params.id);
    if (!jobUpdate) { let error = {message: "undefined Job"}; return AppError.tryCatchError(res, error);}

    let job = {
        ...req.body,
        authorId: req.user.id,
      };
    
    const modifiedJob = await Jobs.findOneAndUpdate(
      { _id: req.params.id },
      { ...job },
      { new: true }
    );
    return successWithData(res, OK, "Job modified", modifiedJob);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.deleteJob = async (req, res, file) => {
  try {
    await Jobs.findOneAndDelete({ _id: req.params.id });
    return successNoData(res, OK, "Job deleted");
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};
