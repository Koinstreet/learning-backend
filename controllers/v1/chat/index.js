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
    let errors={};
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

exports.setBlockStatus = async (req, res, next) => {
  try {
    let errors={};
    const chatid = req.body.chatid;
    const chat = await Chat.findById(chatid);
    if(req.user.id != chat.users[0] && req.user.id != chat.users[1]) {
      errors.msg = "user is not a member of this chat";
      return AppError.validationError(res, UNAUTHORIZED, errors);
    }
    let blocked = chat.blocked;
    if (!blocked) {
      let update = {blocked: true, blocking_user: req.user.id};
      const updatedChat = await Chat.findByIdAndUpdate(chatid, update, {new:true});
      return successWithData(
        res,
        OK,
        "Chat status has been updated",
        updatedChat
      );
    } else {
      if (chat.blocking_user == req.user.id) {
        let update = {blocked: false, blocking_user: null};
        const updatedChat = await Chat.findByIdAndUpdate(chatid, update, {new:true});
        return successWithData(
          res,
          OK,
          "Chat status has been updated",
          updatedChat
        );
      }
        errors.msg = "user cannot unblock this chat";
        return AppError.validationError(res, UNAUTHORIZED, errors);
    }

  }catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getAllChats = async (req, res, next) => {
  try {
    const userChats = await Chat.find({ users: { $in:[req.user.id] }, blocked: { $in: ["false",false] }, accepted: { $in: ["true",true] } }).populate("users").sort("-createdAt");
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
    let errors={};
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

exports.getPendingChats = async (req, res, next) => {
  try {
    const userChats = await Chat.find({ users: { $in:[req.user.id] }, blocked: { $in: ["false",false] }, accepted: { $in: ["false",false] } }).populate("users").sort("-createdAt");
    return successWithData(
      res, 
      OK,
      "Pending chats fetched successfully",
      userChats
    );

  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getBlockedChats = async (req, res, next) => {
  try {
    const userChats = await Chat.find({ users: { $in:[req.user.id] }, blocked: { $in: ["true",true] } }).populate("users").sort("-createdAt");
    return successWithData(
      res, 
      OK,
      "Blocked chats fetched successfully",
      userChats
    );

  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};