const { CREATED, UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");

// DB
const Event = require("../../../model/v1/Events");

const validateEvent  = require("../../../validators/event");

import sendEmail from '../../../utils/email/sendEmail';
import emailTemplate from '../../../utils/email/event/createEvent';

const uploadImage = require("../../../utils/uploadImage");

const {
  successWithData,
  successNoData,
} = require("../../../utils/successHandler");

// Error
const AppError = require("../../../utils/appError");

exports.createEvent = async (req, res, next) => {
  try {
    const { errors, isValid } = validateEvent(req.body);
    if (!isValid) {
      return AppError.validationError(res, BAD_REQUEST, errors);
    }
    let event;
    if (req.file) {
      const data = await uploadImage(req.file);
      if (!data.url || !data.public_id) return AppError.tryCatchError(res, err);
      event = {
        ...req.body,
        host: req.user.id,
        EventPicture: data.url,
      };
    } else {
      event = {
        ...req.body,
        host: req.user.id,
      };
    }

    const newEvent= await Event.create(event);

    const subject = 'Event Successfuly Created!';
    sendEmail(emailTemplate(req.user.firstName, newEvent.EventPicture, newEvent.eventName, newEvent.EventDescription, newEvent.eventLink), subject, req.user.email);


    return successWithData(
      res,
      CREATED,
      "Event created successfully",
      newEvent
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.find({})
      .populate("host", "-password")
      .sort("-createdAt");
    return successWithData(res, OK, "Events fetched successfully", events);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id).populate(
      "host",
      "-password"
    );
    if (!event) return AppError.tryCatchError(res, err);
    return successWithData(res, OK, "Event fetched successfully", event);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.updateEvent = async (req, res, next) => {
  
  try {
    const { errors, isValid } = validateEvent(req.body);
    if (!isValid) {
      return AppError.validationError(res, BAD_REQUEST, errors);
    }

    const eventUpdate = await Event.findById(req.params.id);
    if (!eventUpdate) return AppError.tryCatchError(res, err);
    let event;
    if (req.file) {
      const data = await uploadImage(req.file);
      if (!data.url || !data.public_id)
        return AppError.tryCatchError(this.res, err);
      event = {
        ...req.body,
        host: req.user.id,
        EventPicture: data.url,
      };
    } else {
      event = {
        ...req.body,
        host: req.user.id,
      };
    }
    const modifiedEvent = await Event.findOneAndUpdate(
      { _id: req.params.id },
      { ...event },
      { new: true }
    );
    return successWithData(res, OK, "Event modified", modifiedEvent);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.deleteEvent = async (req, res, file) => {
  try {
    await Event.findOneAndDelete({ _id: req.params.id });
    return successNoData(res, OK, "Event deleted");
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};
