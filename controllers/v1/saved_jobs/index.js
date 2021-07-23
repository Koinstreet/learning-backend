const { CREATED, UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");

// DB
const SavedJobs = require("../../../model/v1/SavedJobs");
const Jobs = require("../../../model/v1/Jobs");


// Validation
const validateSavedJob = require("../../../validators/savedJobs");

const {
  successWithData,
  successNoData,
} = require("../../../utils/successHandler");

// Error
const AppError = require("../../../utils/appError");

exports.createSavedJobs = async (req, res, next) => {
  const { errors, isValid } = validateSavedJob(req.body);
  try {
    let savedJobs = {
        ...req.body,
        job_id: req.body.job_id,
        user_id : req.user.id,
      };

      const findJob = await Jobs.findById(req.body.job_id).populate(
        "_id"
      );
    if (!findJob) {
    console.log('no job found')
    }

    const SavedJobss = await SavedJobs.find({}).populate("user_id").populate("job_id").sort("-createdAt");

    SavedJobss.map((saved) => {
      if (saved.job_id === req.body.job_id && saved.user_id === req.user.id){
      errors.msg = "Already Saved this Job";
      return AppError.validationError(res, UNAUTHORIZED, errors);
      }
    })

    const newSavedJobs= await SavedJobs.create(savedJobs);

    return successWithData(
      res,
      CREATED,
      "SavedJobs created successfully",
      newSavedJobs
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getAllSavedJobs= async (req, res, next) => {
  try {
    const SavedJobss = await SavedJobs.find({}).populate("user_id").populate("job_id").sort("-createdAt");
    return successWithData(res, OK, "SavedJobs fetched successfully", SavedJobss);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};


exports.getSavedJobs = async (req, res, next) => {
  try {
    const SavedJobss = await SavedJobs.findById(req.params.id).populate("user_id").populate("job_id").sort("-createdAt");
    if (!SavedJobss) { let error = {message: "undefined saved jobs"}; return AppError.tryCatchError(res, error);}
    return successWithData(res, OK, "SavedJobs fetched successfully", SavedJobss);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.updateSavedJobs = async (req, res, next) => {
  try {
    const SavedJobsUpdate = await SavedJobs.findById(req.params.id);
    if (!SavedJobsUpdate) { let error = {message: "undefined saved job"}; return AppError.tryCatchError(res, error);}


    let savedJobs = {
        ...req.body,
      };
    
    const modifiedSavedJobs = await SavedJobs.findOneAndUpdate(
      { _id: req.params.id },
      { ...savedJobs },
      { new: true }
    );
    return successWithData(res, OK, "SavedJobs modified", modifiedSavedJobs);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.deleteSavedJobs = async (req, res, file) => {
  try {
    const deletedJob = await SavedJobs.findOneAndDelete({ _id: req.params.id });
    if (!deletedJob) { let error = {message: "undefined job"}; return AppError.tryCatchError(res, error);}
    return successNoData(res, OK, "SavedJobs deleted");
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};
