const { CREATED, UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");
import sendEmail from '../../../utils/email/sendEmail';
import proposalApproval from '../../../utils/email/ProposalStatus/proposalApproval';
import proposalDenial from '../../../utils/email/ProposalStatus/proposalDenial';

// DB
const ProposalStatus = require("../../../model/v1/ProposalStatus");
const Proposals = require("../../../model/v1/Proposal");
const Notifications = require("../../../model/v1/notifications");


// Validation
const validateProposalStatus = require("../../../validators/proposalStatus");

const {
  successWithData,
  successNoData,
} = require("../../../utils/successHandler");

// Error
const AppError = require("../../../utils/appError");

exports.createProposalStatus = async (req, res, next) => {
  const { errors, isValid } = validateProposalStatus(req.body);
  if (!isValid) {
    return AppError.validationError(res, BAD_REQUEST, errors);
  }
  try {

    let proposalStatus = {
        ...req.body,
        proposal_id: req.body.proposal_id,
        authorId : req.user.id,
      };

      const findproposal = await Proposals.findById(req.body.proposal_id).populate("userId").populate("startUp_id").populate("event_id").populate("project_id")
    if (!findproposal) {
    console.log('no proposal found')
    errors.msg = "Invalid proposal";
    return AppError.validationError(res, BAD_REQUEST, errors);
    }

    if(findproposal.userId._id.toString() === req.user.id.toString()){
        let error = {message: "you can not approve or deny a proposal you created"}; return AppError.tryCatchError(res, error);
      }

    const newProposalStatus = await ProposalStatus.create(proposalStatus);

    let subjectApproved;
    let subjectDenied;

    if(newProposalStatus.approved === false && findproposal.type.toString() === "Startup".toString()){
        subjectDenied = `your ${findproposal.startUp_id.name} Startup proposal did not make it to the next step`;
        sendEmail(proposalDenial(findproposal.userId.firstName, findproposal.startUp_id.name, 'Startup', newProposalStatus.denialReason), subjectDenied, findproposal.userId.email);
        const newNotification = await Notifications.create({receiverId: findproposal.userId._id,title: subjectDenied, startUp_id: findproposal.startUp_id._id, type: 'Startup', authorId: null});
    }

    if(newProposalStatus.approved === false && findproposal.type.toString() === "Event".toString()){
        subjectDenied = `your ${findproposal.event_id.eventName} Event proposal did not make it to the next step`;
        sendEmail(proposalDenial(findproposal.userId.firstName, findproposal.event_id.eventName, 'Event', newProposalStatus.denialReason), subjectDenied, findproposal.userId.email);
        const newNotification = await Notifications.create({receiverId: findproposal.userId._id, title: subjectDenied, event_id: findproposal.event_id._id, type: 'Event', authorId: null});
    }

    if(newProposalStatus.approved === false && findproposal.type.toString() === "Project".toString()){
        subjectDenied = `your ${findproposal.project_id.project_name} Project proposal did not make it to the next step`;
        sendEmail(proposalDenial(findproposal.userId.firstName, findproposal.project_id.project_name, 'Project', newProposalStatus.denialReason), subjectDenied, findproposal.userId.email);
        const newNotification = await Notifications.create({receiverId: findproposal.userId._id, title: subjectDenied, project_id: findproposal.project_id._id, type: 'Project', authorId: null});

    }

    if(newProposalStatus.approved === true && findproposal.type.toString() === "Startup".toString()){
        subjectApproved = `your ${findproposal.startUp_id.name} Startup proposal has been approved`;
        sendEmail(proposalApproval(findproposal.userId.firstName, findproposal.startUp_id.name, 'Startup', req.user.email), subjectApproved, findproposal.userId.email);
        const newNotification = await Notifications.create({receiverId: findproposal.userId._id, title: subjectApproved, startUp_id: findproposal.startUp_id._id, type: 'Startup', authorId: req.user.id});

    }

    if(newProposalStatus.approved === true && findproposal.type.toString() === "Event".toString()){
        subjectApproved = `your ${findproposal.event_id.eventName} Event proposal has been approved`;
        sendEmail(proposalApproval(findproposal.userId.firstName, findproposal.event_id.eventName, 'Event', req.user.email), subjectApproved, findproposal.userId.email);
        const newNotification = await Notifications.create({receiverId: findproposal.userId._id, title: subjectApproved, event_id: findproposal.event_id._id, type: 'Event', authorId: req.user.id});

    }

    if(newProposalStatus.approved === true && findproposal.type.toString() === "Project".toString()){
        subjectApproved = `your ${findproposal.project_id.project_name} Project proposal has been approved`;
        sendEmail(proposalApproval(findproposal.userId.firstName, findproposal.project_id.project_name, 'Project', req.user.email), subjectApproved, findproposal.userId.email);
        const newNotification = await Notifications.create({receiverId: findproposal.userId._id, title: subjectApproved, project_id: findproposal.project_id._id, type: 'Project', authorId: req.user.id});

    }
   
    return successWithData(
      res,
      CREATED,
      "Created proposal status",
      newProposalStatus
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getAllProposalStatus= async (req, res, next) => {
  try {
    const proposalStatus = await ProposalStatus.find({}).populate("authorId").populate("proposal_id").populate("startUp_id").populate("event_id").populate("project_id").sort("-createdAt");
    return successWithData(res, OK, "ProposalStatus fetched successfully", proposalStatus);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getAllApprovedProposals= async (req, res, next) => {
    try {
      const proposalStatus = await ProposalStatus.find({approved: true}).populate("authorId").populate("proposal_id").populate("startUp_id").populate("event_id").populate("project_id").sort("-createdAt");
      return successWithData(res, OK, "approved Proposals fetched successfully", proposalStatus);
    } catch (err) {
      console.log(err);
      return AppError.tryCatchError(res, err);
    }
};

exports.getAllDeniedProposals= async (req, res, next) => {
    try {
      const proposalStatus = await ProposalStatus.find({approved: false}).populate("authorId").populate("proposal_id").populate("startUp_id").populate("event_id").populate("project_id").sort("-createdAt");
      return successWithData(res, OK, "denied Proposals fetched successfully", proposalStatus);
    } catch (err) {
      console.log(err);
      return AppError.tryCatchError(res, err);
    }
};

exports.getAllUserApprovedProposal = async (req, res, next) => {
  try {
    const ProposalStatuss = await ProposalStatus.find({authorId : req.user.id, approved: true}).populate("authorId").populate("proposal_id").populate("startUp_id").populate("event_id").populate("project_id").sort("-createdAt");
    if (!ProposalStatuss) { let error = {message: "you have approved any proposal"}; return AppError.tryCatchError(res, error);}
    return successWithData(res, OK, "user approved proposals fetched successfully", ProposalStatuss);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};


exports.getAllUserDeniedProposal = async (req, res, next) => {
    try {
      const ProposalStatuss = await ProposalStatus.find({authorId : req.user.id, approved: false}).populate("authorId").populate("proposal_id").populate("startUp_id").populate("event_id").populate("project_id").sort("-createdAt");
      if (!ProposalStatuss) { let error = {message: "you have approved any proposal"}; return AppError.tryCatchError(res, error);}
      return successWithData(res, OK, "user denied proposals fetched successfully", ProposalStatuss);
    } catch (err) {
      console.log(err);
      return AppError.tryCatchError(res, err);
    }
  };

exports.getProposalStatus = async (req, res, next) => {
  try {
    const proposalStatus = await ProposalStatus.findById(req.params.id).populate("authorId").populate("proposal_id").populate("startUp_id").populate("event_id").populate("project_id").sort("-createdAt");
    if (!proposalStatus) { let error = {message: "undefined proposal status"}; return AppError.tryCatchError(res, error);}

    return successWithData(res, OK, "ProposalStatus fetched successfully", proposalStatus);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.updateProposalStatus = async (req, res, next) => {
  try {
    const ProposalStatusUpdate = await ProposalStatus.findById(req.params.id);
    if (!ProposalStatusUpdate) { let error = {message: "undefined proposal status"}; return AppError.tryCatchError(res, error);}

    const findproposal = await Proposals.findById(req.body.proposal_id).populate("userId").populate("startUp_id").populate("event_id").populate("project_id")
    if (!findproposal) {
    console.log('no proposal found')
    let errors = "Invalid proposal";
    return AppError.validationError(res, BAD_REQUEST, errors);
    }

    if(findproposal.userId._id.toString() === req.user.id.toString()){
        let error = {message: "you can not approve or deny a proposal you created"}; return AppError.tryCatchError(res, error);
      }

    let proposalStatus = {
        ...req.body,
      };
    
    const modifiedProposalStatus = await ProposalStatus.findOneAndUpdate(
      { _id: req.params.id },
      { ...proposalStatus },
      { new: true }
    );

    let subjectApproved;
    let subjectDenied;

    if(modifiedProposalStatus.approved === false && findproposal.type.toString() === "Startup".toString()){
        subjectDenied = `your ${findproposal.startUp_id.name} Startup proposal did not make it to the next step`;
        sendEmail(proposalDenial(findproposal.userId.firstName, findproposal.startUp_id.name, 'Startup', modifiedProposalStatus.denialReason), subjectDenied, findproposal.userId.email);
        const newNotification = await Notifications.create({receiverId: findproposal.userId._id,title: subjectDenied, startUp_id: findproposal.startUp_id._id, type: 'Startup', authorId: null});

    }

    if(modifiedProposalStatus.approved === false && findproposal.type.toString() === "Event".toString()){
        subjectDenied = `your ${findproposal.event_id.eventName} Event proposal did not make it to the next step`;
        sendEmail(proposalDenial(findproposal.userId.firstName, findproposal.event_id.eventName, 'Event', modifiedProposalStatus.denialReason), subjectDenied, findproposal.userId.email);
        const newNotification = await Notifications.create({receiverId: findproposal.userId._id, title: subjectDenied, event_id: findproposal.event_id._id, type: 'Event', authorId: null});
    }

    if(modifiedProposalStatus.approved === false && findproposal.type.toString() === "Project".toString()){
        subjectDenied = `your ${findproposal.event_id.project_name} Project proposal did not make it to the next step`;
        sendEmail(proposalDenial(findproposal.userId.firstName, findproposal.event_id.project_name, 'Project', modifiedProposalStatus.denialReason), subjectDenied, findproposal.userId.email);
        const newNotification = await Notifications.create({receiverId: findproposal.userId._id, title: subjectDenied, project_id: findproposal.project_id._id, type: 'Project', authorId: null});

    }

    if(modifiedProposalStatus.approved === true && findproposal.type.toString() === "Startup".toString()){
        subjectApproved = `your ${findproposal.startUp_id.name} Startup proposal has been approved`;
        sendEmail(proposalApproval(findproposal.userId.firstName, findproposal.startUp_id.name, 'Startup', req.user.email), subjectApproved, findproposal.userId.email);
        const newNotification = await Notifications.create({receiverId: findproposal.userId._id, title: subjectApproved, startUp_id: findproposal.startUp_id._id, type: 'Startup', authorId: req.user.id});
    }

    if(modifiedProposalStatus.approved === true && findproposal.type.toString() === "Event".toString()){
        subjectApproved = `your ${findproposal.event_id.eventName} Event proposal has been approved`;
        sendEmail(proposalApproval(findproposal.userId.firstName, findproposal.event_id.eventName, 'Event', req.user.email), subjectApproved, findproposal.userId.email);
        const newNotification = await Notifications.create({receiverId: findproposal.userId._id, title: subjectApproved, event_id: findproposal.event_id._id, type: 'Event', authorId: req.user.id});
    }

    if(modifiedProposalStatus.approved === true && findproposal.type.toString() === "Project".toString()){
        subjectApproved = `your ${findproposal.event_id.project_name} Project proposal has been approved`;
        sendEmail(proposalApproval(findproposal.userId.firstName, findproposal.event_id.project_name, 'Project', req.user.email), subjectApproved, findproposal.userId.email);
        const newNotification = await Notifications.create({receiverId: findproposal.userId._id, title: subjectApproved, project_id: findproposal.project_id._id, type: 'Project', authorId: req.user.id});
    }
   

    return successWithData(res, OK, "ProposalStatus modified", modifiedProposalStatus);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};


exports.deleteProposalStatus = async (req, res, file) => {
  try {
    const ProposalStatus = await ProposalStatus.findOneAndDelete({ _id: req.params.id });
    if (!ProposalStatus) { let error = {message: "undefined proposal status"}; return AppError.tryCatchError(res, error);}
    return successNoData(res, OK, "proposal status deleted");
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};
