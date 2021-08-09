
const { OK } = require("http-status-codes");

// DB
const User = require("../../../model/v1/User");

//cloudinary upload
const uploadImage = require("../../../utils/uploadImage");

// Error
const AppError = require("../../../utils/appError");
// Success
const { successWithData } = require("../../../utils/successHandler");


exports.getUser = async (req, res, next) => {
    console.log(req.user)

  try {
    const user = await User.findById(req.params.id);
    successWithData(res, OK, "user successful", user);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.updateUser = async (req, res, next) => {
  
  try {
    
    const user = await User.findById(req.params.id);

    if (!user) { let error = {message: "undefined user"}; return AppError.tryCatchError(res, error);}
    
    let updatedUser;
    if (req.file) {
      const data = await uploadImage(req.file);
      if (!data.url || !data.public_id)
        return AppError.tryCatchError(this.res, err);
        updatedUser = {
        ...req.body,
        profilePicture: data.url,

      };
      console.log(data.url)
    } else {
      updatedUser = {
        ...req.body,
        isUpdated : true
      };
    }
    const modifieduser = await User.findOneAndUpdate(
      { _id: req.params.id },
      { ...updatedUser },
      { new: true }
    );
    console.log(req.body)
    return successWithData(res, OK, "User Updated", modifieduser);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};
