const { CREATED, UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");

// DB
const Wallet = require("../../../model/v1/wallets");

const validateWallet = require("../../../validators/wallets");

const {
  successWithData,
  successNoData,
} = require("../../../utils/successHandler");

// Error
const AppError = require("../../../utils/appError");

exports.createWallet = async (req, res, next) => {
  try {
    const { errors, isValid } = validateWallet(req.body);
    if (!isValid) {
      return AppError.validationError(res, BAD_REQUEST, errors);
    }

    const existingWallet = await Wallet.findOne({ walletAddress: req.body.walletAddress });

    if (existingWallet) {
        let errors = "Wallet already Exists";
        return AppError.validationError(res, BAD_REQUEST, errors);
      }

    let wallet = {
        ...req.body,
        userId: req.body.userId,
        walletAddress: req.body.walletAddress
      };

    const newWallet = await Wallet.create(wallet);
    return successWithData(
      res,
      CREATED,
      "Wallet created successfully",
      newWallet
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getAllWallet = async (req, res, next) => {
  try {
    const Wallets = await Wallet.find({})
      .populate("userId", "-password")
      .sort("-createdAt");
    return successWithData(res, OK, "Wallet fetched successfully", Wallets);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getAllUserWallets = async (req, res, next) => {
    try {
      const Wallets = await Wallet.find({userId: req.user.id})
        .populate("userId", "-password")
        .sort("-createdAt");
      return successWithData(res, OK, "Wallets fetched successfully", Wallets);
    } catch (err) {
      console.log(err);
      return AppError.tryCatchError(res, err);
    }
  };

exports.getWallet = async (req, res, next) => {
  try {
    const SingleWallet = await Wallet.findById(req.params.id).populate(
      "userId",
      "-password"
    );
    if (!SingleWallet) return AppError.tryCatchError(res, err);
    return successWithData(res, OK, "Wallet fetched successfully", SingleWallet);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.updateWallet = async (req, res, next) => {
  
  try {
    const { errors, isValid } = validateWallet(req.body);
    if (!isValid) {
      return AppError.validationError(res, BAD_REQUEST, errors);
    }

    const WalletUpdate = await Wallet.findById(req.params.id);

    if (!WalletUpdate){let err = "undefined wallet"; return AppError.tryCatchError(res, err);}

    let wallet = {
        ...req.body,
        userId: req.user.id,
      };

    const modifiedWallet = await Wallet.findOneAndUpdate(
      { _id: req.params.id },
      { ...wallet },
      { new: true }
    );
    return successWithData(res, OK, "Wallet modified", modifiedWallet);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.deleteWallet = async (req, res, file) => {
  try {
    await Wallet.findOneAndDelete({ _id: req.params.id });
    return successNoData(res, OK, "Wallet deleted");
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};
