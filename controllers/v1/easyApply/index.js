const { CREATED, UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");
import sendEmail from '../../../utils/email/sendEmail';
import emailTemplateAuthor from '../../../utils/email/easyApply/jobAuthor';
import emailTemplateUser from '../../../utils/email/easyApply/user';

// DB
const EasyApply = require("../../../model/v1/easyApply");
const Jobs = require("../../../model/v1/Jobs");

// Validation
const validateEasyApply = require("../../../validators/easyAppy");

const {
  successWithData,
  successNoData,
} = require("../../../utils/successHandler");

const uploadImage = require("../../../utils/uploadImage");

// Error
const AppError = require("../../../utils/appError");

exports.createEasyApply = async (req, res, next) => {
  const { errors, isValid } = validateEasyApply(req.body);
  if (!isValid) {
    return AppError.validationError(res, BAD_REQUEST, errors);
  }
  try {

    let easyApply;
    if (req.file) {
      const data = await uploadImage(req.file);
      if (!data.url || !data.public_id) return AppError.tryCatchError(res, err);
      easyApply = {
        ...req.body,
        job_id: req.body.job_id,
        authorId : req.user.id,
        resume: data.url,
      };
    } else {
        easyApply = {
        ...req.body,
        job_id: req.body.job_id,
        authorId : req.user.id,
      };
    }

      const findJob = await Jobs.findById(req.body.job_id).populate("authorId")
    if (!findJob) {
    console.log('no Job found')
    errors.msg = "Invalid Job";
    return AppError.validationError(res, BAD_REQUEST, errors);
    }

    const easyApplied = await EasyApply.find({authorId: req.user.id}).sort("-createdAt");

    easyApplied.map((applied) => {
      if ((applied.job_id).toString() === (req.body.job_id).toString()){
      errors.msg = "Already applied for this Job";
      return AppError.validationError(res, UNAUTHORIZED, errors);
      }
    })

    const newEasyApply= await EasyApply.create(easyApply);

    const subjectAuthor = `Incoming Job Application for ${findJob.job_title} position`;
    const subjectUser = `Successfully submitted an application for ${findJob.job_title} position`;

    const applierName = newEasyApply.firstName + newEasyApply.lastName;
    const applierLocation = newEasyApply.country ?  newEasyApply.country : '' + newEasyApply.city ?  newEasyApply.city : '';

    sendEmail(emailTemplateAuthor(findJob.authorId.firstName, newEasyApply.email ? newEasyApply.email : req.user.email, applierName, applierLocation, newEasyApply.relevant_experience, newEasyApply.company, findJob.job_title, findJob.job_description,  newEasyApply.resume, newEasyApply.coverLetter), subjectAuthor, findJob.authorId.email);
    sendEmail(emailTemplateUser(req.user.firstName, newEasyApply.email ? newEasyApply.email : req.user.email, applierName, applierLocation, newEasyApply.relevant_experience, newEasyApply.company, findJob.job_title, findJob.job_description,  newEasyApply.resume, newEasyApply.coverLetter), subjectUser, req.user.email);

    return successWithData(
      res,
      CREATED,
      "user applied for a job",
      newEasyApply
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getAllEasyApplied= async (req, res, next) => {
  try {
    const easyApplied = await EasyApply.find({}).populate("authorId").populate("job_id").sort("-createdAt");
    return successWithData(res, OK, "EasyApplied fetched successfully", easyApplied);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getAllUserEasyApplies = async (req, res, next) => {
  try {
    const EasyApplys = await EasyApply.find({authorId : req.user.id}).populate("authorId").populate("job_id").sort("-createdAt");
    if (!EasyApplys) { let error = {message: "you have not applied to any job using Easy apply method"}; return AppError.tryCatchError(res, error);}
    return successWithData(res, OK, "user easy applied fetched successfully", EasyApplys);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};


exports.getEasyApply = async (req, res, next) => {
  try {
    const easyApply = await EasyApply.findById(req.params.id).populate("authorId").populate("job_id").sort("-createdAt");
    if (!easyApply) { let error = {message: "undefined easy apply"}; return AppError.tryCatchError(res, error);}
    return successWithData(res, OK, "EasyApply fetched successfully", easyApply);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.updateEasyApply = async (req, res, next) => {
  try {
    const EasyApplyUpdate = await EasyApply.findById(req.params.id);
    if (!EasyApplyUpdate) { let error = {message: "undefined easy apply"}; return AppError.tryCatchError(res, error);}


    let easyApply;
    if (req.file) {
      const data = await uploadImage(req.file);
      if (!data.url || !data.public_id) return AppError.tryCatchError(res, err);
      easyApply = {
        ...req.body,
        resume: data.url,
      };
    } else {
        easyApply = {
        ...req.body,
      };
    }
    
    const modifiedEasyApply = await EasyApply.findOneAndUpdate(
      { _id: req.params.id },
      { ...easyApply },
      { new: true }
    );

    return successWithData(res, OK, "EasyApply modified", modifiedEasyApply);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.deleteEasyApply = async (req, res, file) => {
  try {
    const easyApply = await EasyApply.findOneAndDelete({ _id: req.params.id });
    if (!easyApply) { let error = {message: "undefined easy apply"}; return AppError.tryCatchError(res, error);}
    return successNoData(res, OK, "easy apply deleted");
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};
