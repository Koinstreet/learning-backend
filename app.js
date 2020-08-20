const express = require("express");
const morgan = require("morgan");
const cors = require('cors');

// ROUTES
const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');

const app = express();

if (process.env === "development") {
  app.use(morgan("dev"));
}

// Implement Cors
app.use(cors());
app.options('*', cors());

// Body parser, reading data from body into req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("working"));

// INITIALIZE ROUTES
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/course', courseRoutes);

module.exports = app;
