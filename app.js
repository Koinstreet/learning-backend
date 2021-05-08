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
const jobsRoutes = require('./routes/jobsRoutes');
const projectRoutes = require('./routes/projectRoutes');
const eventRoutes = require('./routes/eventRoutes');
const mentorRoutes = require('./routes/menteeRoutes');
const menteeRoutes = require('./routes/mentorRoutes');




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
app.use('/api/v1/job', jobsRoutes);
app.use('/api/v1/project', projectRoutes);
app.use('/api/v1/event', eventRoutes);
app.use('/api/v1/mentor', mentorRoutes);
app.use('/api/v1/mentee', menteeRoutes);

module.exports = app;
