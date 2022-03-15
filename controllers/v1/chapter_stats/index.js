const { CREATED, UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");

// DB
const ChapterStats = require("../../../model/v1/chapter_stats");

const {
    successWithData,
    successNoData,
  } = require("../../../utils/successHandler");

// Error
const AppError = require("../../../utils/appError");

exports.createChapterStats = async (req, res, next) => {
    try {
        let chapter_stats;
        chapter_stats = {
            ...req.body
        }
        const newChapterStats = await ChapterStats.create(chapter_stats);
        console.log(newChapterStats)
        return successWithData(
            res,
            CREATED,
            'chapter_stats created successfully',
            newChapterStats
        );
    } catch (err) {
        console.log(err);
        return AppError.tryCatchError(res, err);
    }
};

exports.getAllChapterStats = async (req, res, next) => {
    try {
      const chapter_stats = await ChapterStats.find({})
        .sort("-createdAt");
      return successWithData(res, OK, "ChapterStats fetched successfully", chapter_stats);
    } catch (err) {
      console.log(err);
      return AppError.tryCatchError(res, err);
    }
};

exports.getChapterStats = async (req, res, next) => {
    try {
      const chapter_stats = await ChapterStats.findById(req.params.id);
      if (!chapter_stats) { let error = {message: "undefined chapter stat"}; return AppError.tryCatchError(res, error);}

      return successWithData(res, OK, "ChapterStats fetched successfully", chapter_stats);
    } catch (err) {
      console.log(err);
      return AppError.tryCatchError(res, err);
    }
};

exports.updateChapterStats = async (req, res, next) => {
    try {
      const chapterStatsUpdate = await ChapterStats.findById(req.params.id);
      if (!chapterStatsUpdate) { let error = {message: "undefined chapter stat"}; return AppError.tryCatchError(res, error);}

      let chapter_stats;

      chapter_stats = {
          ...req.body
      };

      const modifiedChapterStats = await ChapterStats.findOneAndUpdate(
        { _id: req.params.id },
        { ...chapter_stats },
        { new: true }
      );
      return successWithData(res, OK, "ChapterStats modified", modifiedChapterStats);
    } catch (err) {
      console.log(err);
      return AppError.tryCatchError(res, err);
    }
};

exports.deleteChapterStats = async (req, res, file) => {
    try {
      await ChapterStats.findOneAndDelete({ _id: req.params.id });
      return successNoData(res, OK, "resource deleted");
    } catch (err) {
      console.log(err);
      return AppError.tryCatchError(res, err);
    }
};
  