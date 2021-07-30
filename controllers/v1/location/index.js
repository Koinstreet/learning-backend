const { CREATED, UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");

// DB
const Location = require("../../../model/v1/Locations");

const validateLocation  = require("../../../validators/location");

const uploadImage = require("../../../utils/uploadImage");

const {
  successWithData,
  successNoData,
} = require("../../../utils/successHandler");

// Error
const AppError = require("../../../utils/appError");

exports.createLocation = async (req, res, next) => {
  try {
    const { errors, isValid } = validateLocation(req.body);
    if (!isValid) {
      return AppError.validationError(res, BAD_REQUEST, errors);
    }
    let location;
    if (req.file) {
        const logo = await uploadImage(req.file);
      if (!logo.url || !logo.public_id) return AppError.tryCatchError(res, err);
      location = {
        ...req.body,
        added_by: req.user.id,
        LocationLogo: logo.url,
      };
    } else {
      location = {
        ...req.body,
        added_by: req.user.id,
      };
    }

    const newLocation= await Location.create(location);
    return successWithData(
      res,
      CREATED,
      "Location created successfully",
      newLocation
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getAllLocations = async (req, res, next) => {
  try {
    const locations = await Location.find({})
      .populate("added_by", "-password")
      .sort("-createdAt");
    return successWithData(res, OK, "Locations fetched successfully", locations);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getLocation = async (req, res, next) => {
  try {
    const location = await Location.findById(req.params.id).populate("added_by").sort("-createdAt");
    if (!location) { let error = {message: "undefined location"}; return AppError.tryCatchError(res, error);}
    return successWithData(res, OK, "locationfetched successfully", location);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.updateLocation = async (req, res, next) => {
  
  try {
    const { errors, isValid } = validateLocation(req.body);
    if (!isValid) {
      return AppError.validationError(res, BAD_REQUEST, errors);
    }

    const LocationUpdate = await Location.findById(req.params.id);
    if (!LocationUpdate) { let error = {message: "undefined Location"}; return AppError.tryCatchError(res, error);}

    let location;
    if (req.file) {
      const logo = await uploadImage(req.file);
      if (!logo.url || !logo.public_id)
        return AppError.tryCatchError(this.res, err);
      location = {
        ...req.body,
        added_by: req.user.id,
        LocationLogo: logo.url,
      };
    } else {
      location = {
        ...req.body,
        added_by: req.user.id,
      };
    }
    const modifiedLocation = await Location.findOneAndUpdate(
      { _id: req.params.id },
      { ...location },
      { new: true }
    );
    return successWithData(res, OK, "Location modified", modifiedLocation);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.deleteLocation = async (req, res, file) => {
  try {
    await Location.findOneAndDelete({ _id: req.params.id });
    return successNoData(res, OK, "Location deleted");
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};
