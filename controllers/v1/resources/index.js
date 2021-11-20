const { CREATED, UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");

// DB
const Mentorship = require("../../../model/v1/Mentorship");
const Resources = require("../../../model/v1/Resources");

const uploadImage = require("../../../utils/uploadImage");

const {
  successWithData,
  successNoData,
} = require("../../../utils/successHandler");

// Error
const AppError = require("../../../utils/appError");

exports.createResource = async (req, res, next) => {
  try {
    let resource;
    if (req.file) {
      const data = await uploadImage(req.file);
      if (!data.url || !data.public_id) return AppError.tryCatchError(res, err);
      resource = {
        ...req.body,
        icon: data.url,
        mentorship_id: req.params.mentorship_id,
      };
    } else {
      resource = {
        ...req.body,
        mentorship_id: req.params.mentorship_id,
      };
    }

    const mentorship = await Mentorship.findById(req.params.mentorship_id);

    if (!mentorship) {
      console.log("no mentorship found");
      let error = { message: "undefined mentorship" };
      return AppError.tryCatchError(res, error);
    }
    const newResource = await Resources.create(resource);

    return successWithData(
      res,
      CREATED,
      "Resource created successfully",
      newResource
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getAllResources = async (req, res, next) => {
  try {
    const resources = await Resources.find({})
      .populate("Mentorship")
      .sort("-createdAt");
    return successWithData(
      res,
      OK,
      "Resources fetched successfully",
      resources
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getResource = async (req, res, next) => {
  try {
    const resource = await Resources.find({
      mentorship_id: req.params.mentorship_id,
    })
      .populate("mentorship_id")
      .sort("-createdAt");
    return successWithData(res, OK, "Resource fetched successfully", resource);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.updateResource = async (req, res, next) => {
  try {
    const resourceUpdate = await Resources.findById(req.params.resource_id);
    if (!resourceUpdate) {
      let error = { message: "undefined Resource" };
      return AppError.tryCatchError(res, error);
    }

    let resource = {
      ...req.body,
    };

    const modifiedResource = await Resources.findOneAndUpdate(
      { _id: req.params.resource_id },
      { ...resource },
      { new: true }
    );
    return successWithData(res, OK, "Resource modified", modifiedResource);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.deleteResource = async (req, res, file) => {
  try {
    await Resources.findOneAndDelete({ _id: req.params.resource_id });
    return successNoData(res, OK, "Resource deleted");
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};
