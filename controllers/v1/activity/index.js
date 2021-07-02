const { CREATED, UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");

// DB
const Activity = require("../../../model/v1/Activity");

const uploadImage = require("../../../utils/uploadImage");
const {
    successWithData,
    successNoData,
  } = require("../../../utils/successHandler");

// Error
const AppError = require("../../../utils/appError");

exports.createActivity = async (req, res, next) => {
    try {
        let activity;
        if (req.file) {
            const data = await uploadImage(req.file);
            if (!data.url || !data.public_id) return AppError.tryCatchError(res, err);
            activity = {
                ...req.body,
                image: data.url,
            };
        } else {
            activity = {
                ...req.body
            };
        }

        const newActivity = await Activity.create(activity);
        return successWithData(
            res,
            CREATED,
            'Activity created successfully',
            newActivity
        );
    } catch (err) {
        console.log(err);
        return AppError.tryCatchError(res, err);
    }
};

exports.getAllActivities = async (req, res, next) => {
    try {
      const activities = await Activity.find({});
      return successWithData(res, OK, "Activities fetched successfully", activities);
    } catch (err) {
      console.log(err);
      return AppError.tryCatchError(res, err);
    }
};

exports.getActivity = async (req, res, next) => {
    try {
      const activity = await Activity.findById(req.params.id);
      if (!activity) return AppError.tryCatchError(res, err);
      return successWithData(res, OK, "Activity fetched successfully", activity);
    } catch (err) {
      console.log(err);
      return AppError.tryCatchError(res, err);
    }
};

exports.updateActivity = async (req, res, next) => {
    try {
      const activityUpdate = await Activity.findById(req.params.id);
      if (!activityUpdate) return AppError.tryCatchError(res, err);

      let activity;
      if (req.file) {
        const data = await uploadImage(req.file);
        if (!data.url || !data.public_id)
            return AppError.tryCatchError(this.res, err);
        activity = {
            ...req.body,
            image: data.url
        };
      } else {
        activity = {
            ...req.body
        }
      }
      

      const modifiedActivity = await Activity.findOneAndUpdate(
        { _id: req.params.id },
        { ...activity },
        { new: true }
      );
      return successWithData(res, OK, "Activity modified", modifiedActivity);
    } catch (err) {
      console.log(err);
      return AppError.tryCatchError(res, err);
    }
};

exports.deleteActivity = async (req, res, file) => {
    try {
      await Activity.findOneAndDelete({ _id: req.params.id });
      return successNoData(res, OK, "resource deleted");
    } catch (err) {
      console.log(err);
      return AppError.tryCatchError(res, err);
    }
};
  