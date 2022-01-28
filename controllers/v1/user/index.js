const { OK } = require("http-status-codes");

const ethers = require("ethers");
const { UNAUTHORIZED, BAD_REQUEST } = require("http-status-codes");
import sendEmail from "../../../utils/email/sendEmail";
import profileMint from "../../../utils/email/Mint/profileMint";
import createWallet from "../../../utils/serverWallet";

// DB
const User = require("../../../model/v1/User");
const Transactions = require("../../../model/v1/Transactions");

//cloudinary upload
const uploadImage = require("../../../utils/uploadImage");

const validateMint = require("../../../validators/validateMint");

const validateResetPassword = require("../../../validators/resetPassword");
const validateForgotPassword = require("../../../validators/forgotPassword");

// Error
const AppError = require("../../../utils/appError");
// Success
const { successWithData } = require("../../../utils/successHandler");

const abi = require("../../../artifacts/contracts/NFT.sol/NFT.json");

exports.getUser = async (req, res, next) => {
  console.log(req.user);

  try {
    const user = await User.findById(req.params.id);
    successWithData(res, OK, "user successful", user);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getUsername = async (req, res, next) => {
  try {
    const query = req.params.username;

    console.log(query);

    const userResults = await User.aggregate([
      {
        $search: {
          index: "default",
          text: {
            query: query,
            path: ["userName"]
          }
        }
      }
    ]);

    return successWithData(res, OK, "user returned successfully", userResults);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      let error = { message: "undefined user" };
      return AppError.tryCatchError(res, error);
    }

    let updatedUser;
    if (req.file) {
      const data = await uploadImage(req.file);
      if (!data.url || !data.public_id)
        return AppError.tryCatchError(this.res, err);
      updatedUser = {
        ...req.body,
        profilePicture: data.url
      };
      console.log(data.url);
    } else {
      updatedUser = {
        ...req.body,
        isUpdated: true
      };
    }
    const modifieduser = await User.findOneAndUpdate(
      { _id: req.params.id },
      { ...updatedUser },
      { new: true }
    );
    console.log(req.body);
    return successWithData(res, OK, "User Updated", modifieduser);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.searchUsersByName = async (req, res, next) => {
  try {
    const query = req.params.query;

    const userResults = await User.find({
      $or: [
        { firstName: { $regex: query, $options: "i" } },
        { lastName: { $regex: query, $options: "i" } },
        { userName: { $regex: query, $options: "i" } }
      ]
    });
    return successWithData(res, OK, "searched successfully", userResults);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.mintProfile = async (req, res) => {
  try {
    const { errors, isValid } = validateMint(req.body);
    // if (!isValid) {
    //   return AppError.validationError(res, BAD_REQUEST, errors);
    // }

    const wallet = createWallet();
    const nftaddress = process.env.PROFILE_CONTRACT;

    const collectionContract = new ethers.Contract(nftaddress, abi.abi, wallet);

    let balancePromise = await wallet.getBalance();

    if (ethers.utils.formatEther(balancePromise) === "0.0") {
      let error = { msg: "not enough funds to perform action" };
      return AppError.validationError(res, BAD_REQUEST, error);
    } else {
      const checkTransaction = await Transactions.find({
        userAddress: req.body.userAddress,
        metadata: req.body.metadata
      });

      if (checkTransaction.length >= 1) {
        let error = { msg: "You are only allowed to mint NFT once" };

        return AppError.validationError(res, BAD_REQUEST, error);
      }

      let transaction = await collectionContract.mintNFT(
        req.body.userAddress,
        req.body.metadata
      );
      const tx = await transaction.wait();

      const link = `${process.env.POLYGON_LINK}/${tx.transactionHash}`;
      const subject = "Your Minted NFT";
      sendEmail(
        profileMint(req.user.firstName, req.body.userAddress, link),
        subject,
        req.user.email
      );
      const newTransaction = await Transactions.create({
        metadata: req.body.metadata,
        hash: tx.transactionHash,
        userAddress: req.body.userAddress
      });
      return successWithData(res, OK, "Profile minted successfully", {
        metadata: req.body.metadata,
        transaction: tx.transactionHash,
        checkTransaction
      });
    }
  } catch (e) {
    console.log(e);
    return AppError.tryCatchError(res, e);
  }
};
