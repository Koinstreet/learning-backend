const dotenv = require('dotenv');
const DB = require("./DB");

// env config
dotenv.config({ path: './config.env' });

const app = require("./app");



//***** POSTGRES CONNECTION *****//
// const db = require("./DB/db");
// Test DB
// db.authenticate()
//   .then(() => console.log("Database connected..."))
//   .catch((err) => console.log("Error: " + err));
// db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`App running on port ${PORT}...`);
// });


DB.connect().then(() => {
  console.log("Database connection successful");
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}...`);
  });
});