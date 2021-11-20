const { CREATED, UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");

// DB
const Mentor = require("../../../model/v1/Mentor");
const Mentee = require("../../../model/v1/Mentee");
const Mentorship = require("../../../model/v1/Mentorship");

const uploadImage = require("../../../utils/uploadImage");

const {
  successWithData,
  successNoData,
} = require("../../../utils/successHandler");

// Error
const AppError = require("../../../utils/appError");

exports.createMentorship = async (req, res, next) => {
  try {
    let mentorship;
    if (req.file) {
      const data = await uploadImage(req.file);
      if (!data.url || !data.public_id) return AppError.tryCatchError(res, err);
      mentorship = {
        ...req.body,
        qr_code: data.url,
        mentor_id: req.body.mentor_id,
        mentee_id: req.body.mentee_id,
      };
    } else {
      mentorship = {
        ...req.body,
        mentor_id: req.body.mentor_id,
        mentee_id: req.body.mentee_id,
      };
    }

    const mentor = await Mentor.findById(req.body.mentor_id).populate(
      "user_id",
      "-password"
    );
    const mentee = await Mentee.findById(req.body.mentee_id).populate(
      "user_id",
      "-password"
    );
    if (!mentor) {
      console.log("no mentor found");
      let error = { message: "undefined mentor" };
      return AppError.tryCatchError(res, error);
    } else if (!mentee) {
      console.log("no mentee found");
      let error = { message: "undefined mentee" };
      return AppError.tryCatchError(res, error);
    }

    const newMentorship = await Mentorship.create(mentorship);

    return successWithData(
      res,
      CREATED,
      "Mentorship created successfully",
      newMentorship
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getAllMentorship = async (req, res, next) => {
  try {
    const mentorships = await Mentorship.find({})
      .populate("mentor_id")
      .populate("mentee_id")
      .sort("-createdAt");
    return successWithData(
      res,
      OK,
      "mentorship fetched successfully",
      mentorships
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getMentorship = async (req, res, next) => {
  try {
    const mentorships = await Mentorship.findById(req.params.id)
      .populate("mentor_id")
      .populate("mentee_id")
      .sort("-createdAt");
    if (!mentorships) {
      let error = { message: "undefined mentorship" };
      return AppError.tryCatchError(res, error);
    }
    return successWithData(
      res,
      OK,
      "Mentorship fetched successfully",
      mentorships
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.updateMentorship = async (req, res, next) => {
  try {
    const mentorshipUpdate = await Mentorship.findById(req.params.id);
    if (!mentorshipUpdate) {
      let error = { message: "undefined mentorship" };
      return AppError.tryCatchError(res, error);
    }

    let mentorship = {
      ...req.body,
    };

    const modifiedMentorship = await Mentorship.findOneAndUpdate(
      { _id: req.params.id },
      { ...mentorship },
      { new: true }
    );
    return successWithData(res, OK, "Mentorship modified", modifiedMentorship);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.deleteMentorship = async (req, res, file) => {
  try {
    await Mentorship.findOneAndDelete({ _id: req.params.id });
    return successNoData(res, OK, "Mentorship deleted");
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};
