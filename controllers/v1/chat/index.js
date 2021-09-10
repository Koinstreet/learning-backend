const { CREATED, UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");

//DB
const Chat = require('../../../model/v1/Chat');
const ChatMessage = require('../../../model/v1/ChatMessage');
const User = require('../../../model/v1/User');

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
    if (!checkChat) {
      errors.msg = "that chat does not exist";
      return AppError.tryCatchError(res, err);
    } 
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

exports.deleteChat = async (req, res, next) => {
  try {
    const errors = {};
    const chatid = req.params.id;

    const checkChat = await Chat.findById(chatid);
    if (!checkChat) {
      errors.msg = "that chat does not exist";
      return AppError.validationError(res, UNAUTHORIZED, errors);
    }
    if (req.user.id != checkChat.users[0] && req.user.id != checkChat.users[1]) {
      errors.msg = "user does not have access to this chat";
      return AppError.validationError(res, UNAUTHORIZED, errors);
    }
    const chatMessages = await ChatMessage.find({ chat: chatid });
    if (chatMessages) {
      if (chatMessages.length == 1) {
        await ChatMessage.deleteOne({ chat: chatid });
      }
      else {
        await ChatMessage.deleteMany({ chat: chatid });
      }
    }
    await Chat.findByIdAndDelete(chatid);

    return successNoData(res, OK, "chat deleted");

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

exports.searchChats = async (req, res, next) => {
  try {
    const query = req.params.query;
    const self = req.user.id;
    const userChats = await Chat.find({ users: { $in:[self] }}).populate("users");
    let userChatsIds = [];
    userChats.forEach((chat)=>{
      userChatsIds.push(chat._id);
    });

    const userResults = await User.find({$or:[
      {firstName: {$regex:query, $options:'i'}},
      {lastName: {$regex:query, $options:'i'}},
      {userName: {$regex:query, $options:'i'}}
    ]});

    const chatResults = [];
    userChats.forEach((chat) => {
      userResults.forEach((user)=> {
        if(user._id.toString() === self.toString()) {
          return;
        }
        if (chat.users[0]._id.toString() === user._id.toString() || chat.users[1]._id.toString() === user._id.toString()){
          chatResults.push(chat)
        }
      });
    });

    const messageResults = await ChatMessage.find({ $and:
      [{chat: {$in:userChatsIds}},
      {message: {$regex:query, $options:'i' }}]}).populate("user").populate({path:"chat", populate: {path:"users"}});

    let results = {chats: chatResults, messages: messageResults};
    return successWithData(
      res, 
      OK,
      "searched successfully",
      results
    );

  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};