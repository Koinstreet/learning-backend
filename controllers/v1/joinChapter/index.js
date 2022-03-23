const { CREATED, UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");

// DB
const JoinChapter = require("../../../model/v1/joinChapter");
const Locations = require("../../../model/v1/Locations");
const Notifications = require("../../../model/v1/notifications");

import sendEmail from "../../../utils/email/sendEmail";
import emailTemplate from "../../../utils/email/chapter/joinChapterEmail";
import emailTemplate2 from "../../../utils/email/chapter/joinedChapterEmail";

// Validation
const validateJoinChapter = require("../../../validators/joinChapter");

const {
  successWithData,
  successNoData,
} = require("../../../utils/successHandler");

// Error
const AppError = require("../../../utils/appError");

exports.createJoinChapter = async (req, res, next) => {
  const { errors, isValid } = validateJoinChapter(req.body);
  try {
    const findLocation = await Locations.findById(
      req.body.chapterLocation_id
    ).populate("_id");
    if (!findLocation) {
      console.log("no Chapter found");
      errors.msg = "no Chapter found";
      return AppError.validationError(res, UNAUTHORIZED, errors);
    } else if (findLocation.added_by.toString() === req.user.id.toString()) {
      console.log("You can not join a chapter you created");
      errors.msg = "You can not join a chapter you created";
      return AppError.validationError(res, BAD_REQUEST, errors);
    } else {
      const JoinChapters = await JoinChapter.find({}).sort("-createdAt");
      let err = false;
      JoinChapters.some((joined) => {
        if (
          joined.chapterLocation_id.toString() ===
            req.body.chapterLocation_id.toString() &&
          joined.user_id.toString() === req.user.id.toString()
        ) {
          console.log("you've already joined this chapter");
          errors.msg = "you've already joined this chapter";
          err = true;
          return AppError.validationError(res, BAD_REQUEST, errors);
        }
      });
      if (!err) {
        let joinChapter = {
          ...req.body,
          chapterLocation_id: req.body.chapterLocation_id,
          user_id: req.user.id,
        };
        const newJoinChapter = await JoinChapter.create(joinChapter);

        const subject = `Successfully Requested to join ${findLocation.LocationName} Chapter`;
        sendEmail(
          emailTemplate(
            req.user.firstName,
            findLocation.LocationName,
            findLocation.location
          ),
          subject,
          req.user.email
        );
        const newNotification = await Notifications.create({
          receiverId: req.user.id,
          title: subject,
          chapter_id: req.body.chapterLocation_id,
          type: "Chapter",
          authorId: null,
        });

        return successWithData(
          res,
          CREATED,
          "request to join  chapter sent successfully",
          newJoinChapter
        );
      }
    }
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getAllJoinedChapter = async (req, res, next) => {
  try {
    const JoinedChapters = await JoinChapter.find({})
      .populate("user_id")
      .populate("chapterLocation_id")
      .sort("-createdAt");
    return successWithData(
      res,
      OK,
      "Joined Chapters fetched successfully",
      JoinedChapters
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getUserJoinRequests = async (req, res, next) => {
  try {
    const userJoinRequests = await JoinChapter.find({ user_id: req.user.id })
      .populate("user_id")
      .populate("event_id")
      .sort("-createdAt");
    if (!userJoinRequests) {
      let error = { message: "you have not any join Request" };
      return AppError.tryCatchError(res, error);
    }
    return successWithData(
      res,
      OK,
      "user Join Requests fetched successfully",
      userJoinRequests
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};
exports.getChapterUsers = async (req, res, next) => {
  try {
    const userJoinRequests = await JoinChapter.find({
      chapterLocation_id: req.params.id,
    })
      .populate("user_id")
      .populate("chapterLocation_id")
      .sort("-createdAt");
    if (!userJoinRequests) {
      let error = { message: "no members found" };
      return AppError.tryCatchError(res, error);
    }
    return successWithData(
      res,
      OK,
      "chapter's users fetched successfully",
      userJoinRequests
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getJoinedChapter = async (req, res, next) => {
  try {
    const JoinedChapters = await JoinChapter.findById(req.params.id)
      .populate("user_id")
      .populate("chapterLocation_id")
      .sort("-createdAt");
    if (!JoinedChapters) {
      let error = { message: "undefined joined chapter" };
      return AppError.tryCatchError(res, error);
    }
    return successWithData(
      res,
      OK,
      "Joined Chapter fetched successfully",
      JoinedChapters
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.updateJoinedChapter = async (req, res, next) => {
  try {
    const JoinedChapterUpdate = await JoinChapter.findById(req.params.id);
    if (!JoinedChapterUpdate) {
      let error = { message: "undefined join chapter" };
      return AppError.tryCatchError(res, error);
    }

    const findLocation = await Locations.findById(
      req.body.chapterLocation_id
    ).populate("_id");
    if (!findLocation) {
      console.log("no Chapter found");
      errors.msg = "no Chapter found";
      return AppError.validationError(res, UNAUTHORIZED, errors);
    }

    if (findLocation.added_by._id.toString() !== req.user.id.toString()) {
      console.log("You can not update this Chapter join request");
      errors.msg = "You can not update this Chapter join request";
      return AppError.validationError(res, BAD_REQUEST, errors);
    }

    let JoinedChapter = {
      ...req.body,
    };

    const modifiedJoinedChapter = await JoinChapter.findOneAndUpdate(
      { _id: req.params.id },
      { ...JoinedChapter },
      { new: true }
    );
    return successWithData(
      res,
      OK,
      "Joined Chapter modified",
      modifiedJoinedChapter
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.acceptJoinRequest = async (req, res, next) => {
  try {
    const findLocation = await Locations.findById(req.body.location).populate(
      "_id"
    );
    if (!findLocation) {
      console.log("no Chapter found");
      let error = { message: "no Chapter found" };
      return AppError.tryCatchError(res, error);
    }

    if (findLocation.added_by._id.toString() !== req.user.id.toString()) {
      console.log("You can not update this Chapter join request");
      let error = { message: "You can not update this Chapter join request" };
      return AppError.tryCatchError(res, error);
    }
    const requestId = await JoinChapter.findById(req.params.id);
    if (!requestId) {
      let error = { message: "undefined requestId" };
      return AppError.tryCatchError(res, error);
    }

    const acceptRequest = await JoinChapter.findOneAndUpdate(
      { _id: req.params.id },
      { approved: true }
    );
    const location = await Locations.findOneAndUpdate(
      { _id: req.body.location },
      { member: findLocation.member + 1 }
    );
    const subject = `Successfully accepted to join ${findLocation.LocationName} Chapter`;
    sendEmail(
      emailTemplate2(
        req.user.firstName,
        findLocation.LocationName,
        findLocation.location
      ),
      subject,
      req.user.email
    );
    const newNotification = await Notifications.create({
      receiverId: req.user.id,
      title: subject,
      chapter_id: findLocation._id,
      type: "Chapter",
      authorId: null,
    });

    return successWithData(
      res,
      OK,
      "Request to join chapter approved",
      acceptRequest
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.deleteJoinedChapter = async (req, res, file) => {
  try {
    const deleted = await JoinChapter.findOneAndDelete({ _id: req.params.id });
    if (!deleted) {
      let error = { message: "undefined join chapter" };
      return AppError.tryCatchError(res, error);
    }
    return successNoData(res, OK, "Joined Chapter deleted");
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};
