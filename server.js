const dotenv = require('dotenv');
const socket = require('socket.io');
const DB = require("./DB");
import "@babel/polyfill";
// env config
dotenv.config({ path: './config.env' });


const app = require("./app");
const PORT = process.env.PORT || 5000;

//database connection
DB.connect().then(() => {
  console.log("Database connection successful");
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}...`);
  });
});

