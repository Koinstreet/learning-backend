// SOCKET 

// an array to track which users are online
let onlineUsers = [];

// add a users id and socket id to the onlineUsers array
const addUser = (userId, socketId) => {
  !onlineUsers.some((user) => user.userId === userId) && onlineUsers.push( {userId, socketId });
};

// remove a users id and socket id from the onlineUsers array
const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

// get a user's socket id from their user id
const getUser = (userId) => {
  return onlineUsers.find((user) => user.userId === userId);
};

// socket code
exports.handleSocket = (req, res, next) => {
  const io = req.app.get('socketio');

  io.on("connection", (socket) => {
    console.log("A user connected");

    // Get and store user and socket ids 
    socket.on("addUser", () => {
      // if req.user.id doesnt work do "addUser", (userid) => addUser(userId,socket.id)...
      addUser(req.user.id, socket.id);
      io.emit("getUsers", onlineUsers);
    });

    // send and get messages
    // if req.user.id doesnt work, do 'sendMessage',({senderid, recieverid, text}) => ...
    socket.on("sendMessage", ({ receiverId, text, messageId }) => {
      const user = getUser(receiverId);
      const senderId = req.user.id;
      io.to(user.socketId).emit("getMessage", {
        senderId, 
        text,
        messageId
      });
    });

    // deleting and dropping messages
    socket.on("deleteMessage", ({ receiverId, messageId }) => {
      const user = getUser(receiverID);
      const senderId = req.user.id;
      io.to(user.socketId).emit("dropMessage", {
        senderId,
        messageId
      })
    })

    // when a user disconnects
    socket.on("disconnect", () => {
      console.log("a user disconnected");
      removeUser(socket.id);
      io.emit("getUsers", onlineUsers);
    });
  });
  next();
}
