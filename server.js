const dotenv = require('dotenv');
const DB = require("./DB");
import "@babel/polyfill";
// env config
dotenv.config({ path: './config.env' });

const app = require("./app");

const PORT = process.env.PORT || 5000;

DB.connect().then(() => {
  console.log("Database connection successful");
  const server = app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}...`);
  });
  // setting up socket
  const io = require('socket.io')(server);
  app.set('socketio', io);
});