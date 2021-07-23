const { CREATED, UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");

//DB
const ChatMessage = require('../../../model/v1/ChatMessage');
const Chat = require('../../../model/v1/Chat');

const uploadImage = require("../../../utils/uploadImage");

const {
  successWithData,
  successNoData,
} = require("../../../utils/successHandler");

// Error
const AppError = require("../../../utils/appError");

exports.createMessage = async (req, res, next) => {
  try {
    let content;
    let errors={};
    if(req.file) {
      const data = await uploadImage(req.file);
      if (!data.url || !data.public_id) return AppError.tryCatchError(res, err);
      if(!req.body.message){
        content={
          user: req.user.id,
          file: data.url,
          chat: req.body.chatId
        }
      }
      else {
        content = {
          user: req.user.id,
          message: req.body.message,
          chat: req.body.chatId
        }
      }
    }
    else {
      content = {
        user: req.user.id,
        message: req.body.message,
        chat: req.body.chatId
      }
    }

    const checkChat = await Chat.findById(req.body.chatId);
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
    let errors={};

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
    let errors={};
    const checkUser = await Chat.findById(req.params.id);
    if (!checkUser) {
      errors.msg = "that chat does not exist";
      return AppError.validationError(res, UNAUTHORIZED, errors);
    }
    if (req.user.id != checkUser.users[0] && req.user.id != checkUser.users[1]) {
      errors.msg = "The user is not in this chat";
      return AppError.validationError(res, UNAUTHORIZED, errors);
    }

    const messages = await ChatMessage.find({ chat: req.params.id }).populate("user");

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

exports.deleteMessage = async (req, res, next) => {
  try {
    const messageid = req.body.messageid;
    let errors={};

    const checkUser = await ChatMessage.findById(messageid);
    if (checkUser.user != req.user.id) {
      errors.msg = "this user did not send and cannot delete this message";
      return AppError.validationError(res, UNAUTHORIZED, errors);
    }

    await ChatMessage.findByIdAndDelete(messageid);
    return successNoData(
      res,
      OK,
      "Message deleted"
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
}