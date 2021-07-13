const { CREATED, UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");

// DB
const Chapter = require("../../../model/v1/chapter");

const {
    successWithData,
    successNoData,
  } = require("../../../utils/successHandler");

// Error
const AppError = require("../../../utils/appError");

exports.createChapter = async (req, res, next) => {
    try {
        let chapter;
        chapter = {
            ...req.body,
            userId: req.user.id,
        }
        const newChapter = await Chapter.create(chapter);
        console.log(newChapter)
        return successWithData(
            res,
            CREATED,
            'chapter created successfully',
            newChapter
        );
    } catch (err) {
        console.log(err);
        return AppError.tryCatchError(res, err);
    }
};

exports.getAllChapter = async (req, res, next) => {
    try {
      const chapter = await Chapter.find({})
        .sort("-createdAt");
      return successWithData(res, OK, "Chapters fetched successfully", chapter);
    } catch (err) {
      console.log(err);
      return AppError.tryCatchError(res, err);
    }
};

exports.getChapter = async (req, res, next) => {
    try {
      const chapter = await Chapter.findById(req.params.id);
      if (!chapter) return AppError.tryCatchError(res, err);
      return successWithData(res, OK, "Chapter fetched successfully", chapter);
    } catch (err) {
      console.log(err);
      return AppError.tryCatchError(res, err);
    }
};

exports.updateChapter = async (req, res, next) => {
    try {
      const ChapterUpdate = await Chapter.findById(req.params.id);
      if (!ChapterUpdate) return AppError.tryCatchError(res, err);
      let chapter;

      chapter = {
          ...req.body,
          userId: req.user.id,
      };

      const modifiedChapter = await Chapter.findOneAndUpdate(
        { _id: req.params.id },
        { ...chapter },
        { new: true }
      );
      return successWithData(res, OK, "Chapter modified", modifiedChapter);
    } catch (err) {
      console.log(err);
      return AppError.tryCatchError(res, err);
    }
};

exports.deleteChapter = async (req, res, file) => {
    try {
      await Chapter.findOneAndDelete({ _id: req.params.id });
      return successNoData(res, OK, "Chapter deleted");
    } catch (err) {
      console.log(err);
      return AppError.tryCatchError(res, err);
    }
};
  