const { CREATED, UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");

//DB
const Chat = require('../../../model/v1/Chat');

//Validation
const validateChat = require("../../../validators/chat");

const {
  successWithData,
  successNoData,
} = require("../../../utils/successHandler");

// Error
const AppError = require("../../../utils/appError");

exports.createChat = async (req, res, next) => {
  try {
    const users1 = [req.user.id, req.body.receiverId];
    const users2 = [req.body.receiverId, req.user.id];
    
    const {errors, isValid } = validateChat(users1);

    if (req.user.id == req.body.receiverId) {
      errors.msg = "A user cannot create a chat with themself";
      return AppError.validationError(res, UNAUTHORIZED, errors);
    }

    const chatExists = await Chat.findOne({ $or: [ {users:users1}, {users:users2} ] });
    if (chatExists) {
      errors.msg = "A chat between these users already exists";
      return AppError.validationError(res, UNAUTHORIZED, errors);
    }
    const newChat = await Chat.create({users:users1});
    return successWithData(
      res,
      CREATED,
      "Chat created successfully",
      newChat
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.acceptChat = async (req, res, next) => {
  try {
    const chatid = req.body.chatid;
    const update = {accepted: true};

    const checkChat = await Chat.findById(chatid);

    if (!checkChat) {
      errors.msg = "that chat does not exist";
      return AppError.validationError(res, UNAUTHORIZED, errors);
    }

    if (req.user.id == checkChat.users[0]) {
      errors.msg = "Chat cannot be accepted by sender";
      return AppError.validationError(res, UNAUTHORIZED, errors);
    }
    if(req.user.id != checkChat.users[1]) {
      errors.msg = "user is not a member of this chat";
      return AppError.validationError(res, UNAUTHORIZED, errors);
    }

    const acceptedChat = await Chat.findByIdAndUpdate(chatid, update, {new:true});
    return successWithData(
      res,
      OK,
      "Chat has been accepted",
      acceptedChat
    );
  }catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getAllChats = async (req, res, next) => {
  try {
    const userChats = await Chat.find({ users: { $in:[req.user.id] } }).populate("users").sort("-createdAt");
    return successWithData(
      res, 
      OK,
      "Chats fetched successfully",
      userChats
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getChat = async (req, res, next) => {
  try {
    const checkChat = await Chat.findById(req.params.id);
    if (!checkChat) return AppError.tryCatchError(res, err);
    if(req.user.id != checkChat.users[0] && req.user.id != checkChat.users[1]) {
      errors.msg = "user is not a member of this chat";
      return AppError.validationError(res, UNAUTHORIZED, errors);
    }

    const userChat = await Chat.findById(req.params.id).populate("users");
    return successWithData(
      res,
      OK,
      "Chat fetched successfully",
      userChat
    )
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};
