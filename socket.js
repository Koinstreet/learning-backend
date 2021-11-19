const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected.");

  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage", ({ chatId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user.socketId).emit("getMessage", {
      chatId,
      text,
    });
  });

  //Added to chat
  socket.on("addedToChat", ({ receiverId, chat }) => {
    const user = getUser(receiverId);
    io.to(user.socketId).emit("addedToChat", {
      chat
    });
  });

  //blockedChat
  socket.on("blockedChat", ({ receiverId,  chat }) => {
    const user = getUser(receiverId);
    io.to(user.socketId).emit("blockUser", {
      chat
    });
  });

  //unblockedChat
  socket.on("unblockedChat", ({ receiverId, chat }) => {
    const user = getUser(receiverId);
    io.to(user.socketId).emit("unblockedChat", {
      chat
    });
  });

  //acceptedChat
  socket.on("acceptedChat", ({ receiverId, chat }) => {
    const user = getUser(receiverId);
    io.to(user.socketId).emit("acceptedChat", {
      chat
    });
  });

  //rejectedChat
  socket.on("rejectedChat", ({ receiverId, chat }) => {
    const user = getUser(receiverId);
    io.to(user.socketId).emit("rejectedChat", {
      chat
    });
  });

  socket.on('typing', ({ receiverId, username }) => {
    const user = getUser(receiverId);
    io.to(user.socketId).emit("typing", username);
  })

  //Pending chat
  socket.on("pendingChat", ({ receiverId, chat }) => {
    const user = getUser(receiverId);
    io.to(user.socketId).emit("pendingChat", {
      chat
    });
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

