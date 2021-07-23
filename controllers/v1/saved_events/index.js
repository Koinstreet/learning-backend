const { CREATED, UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");

// DB
const SavedEvents = require("../../../model/v1/SavedEvents");
const Events = require("../../../model/v1/Events");

import sendEmail from '../../../utils/email/sendEmail';
import emailTemplate from '../../../utils/email/event/eventEmails';

// Validation
const validateSavedEvent = require("../../../validators/savedEvents");

const {
  successWithData,
  successNoData,
} = require("../../../utils/successHandler");

// Error
const AppError = require("../../../utils/appError");

exports.createSavedEvents = async (req, res, next) => {
  const { errors, isValid } = validateSavedEvent(req.body);
  try {
    let savedEvents = {
        ...req.body,
        event_id: req.body.event_id,
        user_id : req.user.id,
      };

      const findEVent = await Events.findById(req.body.event_id).populate(
        "_id"
      );
    if (!findEVent) {
    console.log('no event found')
    }

    const SavedEventss = await SavedEvents.find({}).populate("user_id").populate("event_id").sort("-createdAt");

    SavedEventss.map((saved) => {
      if (saved.event_id === req.body.event_id && saved.user_id === req.user.id){
      errors.msg = "Already Registered to this Event";
      return AppError.validationError(res, UNAUTHORIZED, errors);
      }
    })

    const newSavedEvents= await SavedEvents.create(savedEvents);

    const savedEvent = await Events.findById(req.body.event_id).populate(
      "host",
      "-password"
    );

    if(req.body.attending === "yes"){
    const subject = 'Event Successfuly Registered!';
    sendEmail(emailTemplate(req.user.firstName, savedEvent.EventPicture, savedEvent.eventName, savedEvent.EventDescription, savedEvent.eventLink), subject, req.user.email);
    }
    return successWithData(
      res,
      CREATED,
      "SavedEvents created successfully",
      newSavedEvents
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getAllSavedEvents= async (req, res, next) => {
  try {
    const SavedEventss = await SavedEvents.find({}).populate("user_id").populate("event_id").sort("-createdAt");
    return successWithData(res, OK, "SavedEvent fetched successfully", SavedEventss);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};


exports.getSavedEvents = async (req, res, next) => {
  try {
    const SavedEventss = await SavedEvents.findById(req.params.id).populate("user_id").populate("event_id").sort("-createdAt");
    if (!SavedEventss) { let error = {message: "undefined saved events"}; return AppError.tryCatchError(res, error);}
    return successWithData(res, OK, "SavedEvent fetched successfully", SavedEventss);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.updateSavedEvents = async (req, res, next) => {
  
  try {

    const SavedEventsUpdate = await SavedEvents.findById(req.params.id);
    if (!SavedEventsUpdate) { let error = {message: "undefined Saved Event"}; return AppError.tryCatchError(res, error);}


    let savedEvents = {
        ...req.body,
        event_id: req.body.event_id,
        user_id : req.user.id,
      };

    if(req.body.attending === "yes"){
      const subject = 'Event Successfuly Registered!';
      sendEmail(emailTemplate(req.user.firstName, savedEvent.EventPicture, savedEvent.eventName, savedEvent.EventDescription, savedEvent.eventLink), subject, req.user.email);
      }
    
    const modifiedSavedEvents = await SavedEvents.findOneAndUpdate(
      { _id: req.params.id },
      { ...savedEvents },
      { new: true }
    );
    return successWithData(res, OK, "SavedEvents modified", modifiedSavedEvents);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.deleteSavedEvents = async (req, res, file) => {
  try {
    await SavedEvents.findOneAndDelete({ _id: req.params.id });
    return successNoData(res, OK, "SavedEvents deleted");
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};
