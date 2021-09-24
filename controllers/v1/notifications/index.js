const { CREATED, UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");

// DB
const Notifications = require("../../../model/v1/notifications");

const {
    successWithData,
    successNoData,
} = require("../../../utils/successHandler");

// Error
const AppError = require("../../../utils/appError");
const validateNotifications = require("../../../validators/notifications");

exports.createNotifications = async (req, res, next) => {
    try {
      const { errors, isValid } = validateNotifications(req.body);
      if (!isValid) {
        return AppError.validationError(res, BAD_REQUEST, errors);
      }
      let notifications = {
          ...req.body,
          receiverId: req.body.receiverId,
          receiverId : req.user.id,
        };
  
      const newNotifications = await Notifications.create(notifications);
      return successWithData(
        res,
        CREATED,
        "Notification created successfully",
        newNotifications
      );
    } catch (err) {
      console.log(err);
      return AppError.tryCatchError(res, err);
    }
  };

  exports.getAllNotificationss = async (req, res, next) => {
    try {
      const Notificationss = await Notifications.find({}).populate("receiverId").populate("startUp_id").populate("event_id").populate("project_id").populate("authorId").populate('chapter_id').populate('course_id')
        .sort("-createdAt");
      return successWithData(res, OK, "Notificationss fetched successfully", Notificationss);
    } catch (err) {
      console.log(err);
      return AppError.tryCatchError(res, err);
    }
  };

  exports.getNotification = async (req, res, next) => {
    try {
      const notifications = await Notifications.findById(req.params.id).populate("receiverId").populate("startUp_id").populate("event_id").populate("project_id").populate("authorId").populate('chapter_id').populate('course_id');
      let err = "can not find Notifications"
      if (!notifications) return AppError.tryCatchError(res, err);
      return successWithData(res, OK, "Notifications fetched successfully", notifications);
    } catch (error) {
      console.log(error);
      return AppError.tryCatchError(res, error);
    }
  };

  exports.getUserNotifications = async (req, res, next) => {
    try {
      const Notificationss = await Notifications.find({receiverId: req.user.id}).populate("receiverId").populate("startUp_id").populate("event_id").populate("project_id").populate("authorId").populate('chapter_id').populate('course_id')
        .sort("-createdAt");
      return successWithData(res, OK, "Notificationss fetched successfully", Notificationss);
    } catch (err) {
      console.log(err);
      return AppError.tryCatchError(res, err);
    }
  };

  exports.ReadNotifications = async (req, res, next) => {
    try {
      const NotificationsUpdate = await Notifications.findById(req.params.id);
      if (!NotificationsUpdate) {let err = 'undefined notification'; return AppError.tryCatchError(res, err);}

    
      const updatedNotifications = await Notifications.findOneAndUpdate(
        { _id: req.params.id },
        { seen: true },
        { new: true }
      );
      return successWithData(res, OK, "Notifications updated", updatedNotifications);
    } catch (err) {
      console.log(err);
      return AppError.tryCatchError(res, err);
    }
  };
  
  exports.deleteNotifications = async (req, res) => {
    try {
      await Notifications.findOneAndDelete({ _id: req.params.id });
      return successNoData(res, OK, "Notifications deleted");
    } catch (err) {
      console.log(err);
      return AppError.tryCatchError(res, err);
    }
  };
  