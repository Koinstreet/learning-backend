const { CREATED, UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");

//DB
const ChatMessage = require('../../../model/v1/ChatMessage');

const {
  successWithData,
  successNoData,
} = require("../../../utils/successHandler");

// Error
const AppError = require("../../../utils/appError");

exports.createMessage = async (req, res, next) => {
  try {
    const content = {
      user: req.user.id,
      message: req.body.message,
      chat: req.body.chatId
    }

    const checkChat = await Chat.findById(chatid);
    if (!checkChat) {
      errors.msg = "A message cannot be sent because this chat doesn't exist";
      return AppError.validationError(res, UNAUTHORIZED, errors);
    }

    if (req.user.id != checkChat.users[0] && req.user.id != checkChat.users[1]) {
      errors.msg = "User is not a part of this chat and cannot send messages";
      return AppError.validationError(res, UNAUTHORIZED, errors);
    } 
    const newMessage = await ChatMessage.create(content);
    return successWithData(
      res, 
      CREATED,
      "Message created successfully",
      newMessage
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.seenMessage = async (req, res, next) => {
  try {
    const messageid = req.body.messageid;
    const update = {seen:true};

    const checkMessage = await ChatMessage.findById(messageid);
    if (!checkMessage) {
      errors.msg = "this message does not exist";
      return AppError.validationError(res, UNAUTHORIZED, errors);
    }
    if (req.user.id == checkMessage.user) {
      errors.msg = "Message cannot be seen by sender";
      return AppError.validationError(res, UNAUTHORIZED, errors);
    }

    const seenMessage = await ChatMessage.findByIdAndUpdate(messageid, update, {new:true});
    return successWithData(
      res,
      OK,
      "Message has been seen",
      seenMessage
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getAllMessages = async (req, res, next) => {
  try {
    const checkUser = await Chat.findById(req.params.id);
    if (!checkUser) {
      errors.msg = "that chat does not exist";
      return AppError.validationError(res, UNAUTHORIZED, errors);
    }
    if (req.user.id != checkUser.users[0] && req.user.id != checkUser.users[1]) {
      errors.msg = "The user is not in this chat";
      return AppError.validationError(res, UNAUTHORIZED, errors);
    }

    const messages = await ChatMessage.find({ chat: req.params.id }).populate("chat").populate("user");

    return successWithData(
      res,
      OK,
      "Messages fetched successfully",
      messages
    );

  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
}