const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require("./app");
const db = require("./DB/db");


// Test DB
// db.authenticate()
//   .then(() => console.log("Database connected..."))
//   .catch((err) => console.log("Error: " + err));

db.sequelize.sync();

// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});
