const express = require("express");
const morgan = require("morgan");
const cors = require('cors');
import cookieSession from 'cookie-session';
import "@babel/polyfill";
import passport from 'passport';

import socialAuthRoutes from './routes/socialAuthRoutes';

// ROUTES
const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');
const subscriberRoutes = require('./routes/subscriberRoutes');

const app = express();

if (process.env === "development") {
  app.use(morgan("dev"));
}

// Implement Cors
app.use(cors());
app.options('*', cors());

app.use(cookieSession({
  // milliseconds of a day
  maxAge: 24*60*60*1000,
  keys:process.env.cookieKey,
}));

app.use(passport.initialize());
app.use(passport.session());

// Body parser, reading data from body into req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("working"));



app.use(socialAuthRoutes);


// INITIALIZE ROUTES
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/course', courseRoutes);
app.use('/api/v1/subscribe', subscriberRoutes);

module.exports = app;
