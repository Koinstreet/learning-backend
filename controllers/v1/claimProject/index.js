const { CREATED, UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");
import sendEmail from '../../../utils/email/sendEmail';
import emailTemplate from '../../../utils/email/consultancy/claimed';

// DB
const ClaimedProject = require("../../../model/v1/claimedProjectRequests");
const Service = require("../../../model/v1/service");

// Validation
const validateclaimProject = require("../../../validators/claimedProjects");

const {
  successWithData,
  successNoData,
} = require("../../../utils/successHandler");


// Error
const AppError = require("../../../utils/appError");

exports.claimProject = async (req, res, next) => {
  const { errors, isValid } = validateclaimProject(req.body);
  if (!isValid) {
    return AppError.validationError(res, BAD_REQUEST, errors);
  }
  try {
    let alreadyClaimed = "";
    let claimProject = {
        ...req.body,
        project_id: req.body.project_id,
        authorId : req.user.id,
      };

      const findproject = await Service.findById(req.body.project_id).populate("authorId")
    if (!findproject) {
    console.log('no project found')
    errors.msg = "Invalid project";
    return AppError.validationError(res, BAD_REQUEST, errors);
    }
    else if((findproject.authorId._id).toString() === (req.user.id).toString()){
      console.log('You can not claim a project you created')
      errors.msg = "You can not claim a project you created";
      return AppError.validationError(res, BAD_REQUEST, errors);
      }

    const claimedProject = await ClaimedProject.find({authorId: req.user.id}).sort("-createdAt");

    claimedProject.map((claimed) => {
      if ((claimed.project_id).toString() === (req.body.project_id).toString()){
      errors.msg = "Already claimed this project";
      alreadyClaimed = claimed.project_id;
      return AppError.validationError(res, UNAUTHORIZED, errors);
      }
    })
    if((alreadyClaimed).toString() !== (req.body.project_id).toString()){
    const newclaimProject= await ClaimedProject.create(claimProject);

    const subject = `Your project has been claimed by ${req.user.firstName}`;

    sendEmail(emailTemplate(findproject.authorId.firstName, req.user.firstName, req.user.email, findproject.project_name, findproject.project_details? findproject.project_detail : '', findproject.launch_date ? findproject.launch_date : ''), subject, findproject.authorId.email);

    return successWithData(
      res,
      CREATED,
      "user claimed a project",
      newclaimProject
    );
    }
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getAllclaimedProject= async (req, res, next) => {
  try {
    const claimedProject = await ClaimedProject.find({}).populate("authorId").populate("project_id").sort("-createdAt");
    return successWithData(res, OK, "claimedProjects fetched successfully", claimedProject);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getAllUserClaimedProjects = async (req, res, next) => {
  try {
    const claimProject = await ClaimedProject.find({authorId : req.user.id}).populate("authorId").populate("project_id").sort("-createdAt");
    if (!claimProject) { let error = {message: "you have not claimed any project"}; return AppError.tryCatchError(res, error);}
    return successWithData(res, OK, "user claimed projects fetched successfully", claimProject);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};


exports.getclaimedProject = async (req, res, next) => {
  try {
    const claimProject = await ClaimedProject.findById(req.params.id).populate("authorId").populate("project_id").sort("-createdAt");
    if (!claimProject) { let error = {message: "undefined claimed project"}; return AppError.tryCatchError(res, error);}
    return successWithData(res, OK, "claimProject fetched successfully", claimProject);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.updateclaimedProject = async (req, res, next) => {
  try {
    const claimProjectUpdate = await ClaimedProject.findById(req.params.id);
    if (!claimProjectUpdate) { let error = {message: "undefined easy apply"}; return AppError.tryCatchError(res, error);}


    let claimProject = {
        ...req.body,
    }
    
    const modifiedclaimProject = await ClaimedProject.findOneAndUpdate(
      { _id: req.params.id },
      { ...claimProject },
      { new: true }
    );

    return successWithData(res, OK, "claimProject modified", modifiedclaimProject);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.deleteclaimedProject = async (req, res, file) => {
  try {
    const claimProject = await ClaimedProject.findOneAndDelete({ _id: req.params.id });
    if (!claimProject) { let error = {message: "undefined claimed project"}; return AppError.tryCatchError(res, error);}
    return successNoData(res, OK, "claimed project deleted");
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};
