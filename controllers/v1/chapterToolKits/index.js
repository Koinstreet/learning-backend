const { CREATED, UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");

// DB
const ChapterToolKit = require("../../../model/v1/chapterToolkits");

const validateChapterToolKit  = require("../../../validators/ChapterToolKit");

const uploadImage = require("../../../utils/uploadImage");

const {
  successWithData,
  successNoData,
} = require("../../../utils/successHandler");

// Error
const AppError = require("../../../utils/appError");

exports.createChapterToolKit = async (req, res, next) => {
  try {
    const { errors, isValid } = validateChapterToolKit(req.body);
    if (!isValid) {
      return AppError.validationError(res, BAD_REQUEST, errors);
    }
    let chapterToolKit;
    if (req.file) {
        const image = await uploadImage(req.file);
      if (!image.url || !image.public_id) return AppError.tryCatchError(res, err);
      chapterToolKit = {
        ...req.body,
        added_by: req.user.id,
        image: image.url,
      };
    } else {
        chapterToolKit = {
        ...req.body,
        added_by: req.user.id,
      };
    }

    const newChapterToolKit= await ChapterToolKit.create(chapterToolKit);
    return successWithData(
      res,
      CREATED,
      "ChapterToolKit created successfully",
      newChapterToolKit
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getAllChapterToolKits = async (req, res, next) => {
  try {
    const ChapterToolKits = await ChapterToolKit.find({})
      .populate("added_by", "-password")
      .sort("-createdAt");
    return successWithData(res, OK, "ChapterToolKits fetched successfully", ChapterToolKits);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getChapterToolKit = async (req, res, next) => {
  try {
    const chapterToolKit = await ChapterToolKit.findById(req.params.id).populate(
      "added_by",
      "-password"
    );
    if (!chapterToolKit) { let error = {message: "undefined chapter toolkit"}; return AppError.tryCatchError(res, error);}
    return successWithData(res, OK, "ChapterToolKit fetched successfully", chapterToolKit);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.updateChapterToolKit = async (req, res, next) => {
  
  try {
    const { errors, isValid } = validateChapterToolKit(req.body);
    if (!isValid) {
      return AppError.validationError(res, BAD_REQUEST, errors);
    }

    const ChapterToolKitUpdate = await ChapterToolKit.findById(req.params.id);
    if (!ChapterToolKitUpdate) { let error = {message: "undefined chapter toolkit"}; return AppError.tryCatchError(res, error);}

    let chapterToolKit;
    if (req.file) {
      const image = await uploadImage(req.file);
      if (!image.url || !image.public_id)
        return AppError.tryCatchError(this.res, err);
        chapterToolKit = {
        ...req.body,
        added_by: req.user.id,
        image: image.url,
      };
    } else {
        chapterToolKit = {
        ...req.body,
        added_by: req.user.id,
      };
    }
    const modifiedChapterToolKit = await ChapterToolKit.findOneAndUpdate(
      { _id: req.params.id },
      { ...chapterToolKit },
      { new: true }
    );
    return successWithData(res, OK, "ChapterToolKit modified", modifiedChapterToolKit);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.deleteChapterToolKit = async (req, res, file) => {
  try {
    await ChapterToolKit.findOneAndDelete({ _id: req.params.id });
    return successNoData(res, OK, "ChapterToolKit deleted");
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};
