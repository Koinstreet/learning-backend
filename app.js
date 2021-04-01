const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');

// ROUTES
const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');
const subscriberRoutes = require('./routes/subscriberRoutes');
// New Routes
const userRouter = require('./routes/User');
const testimonialRouter = require('./routes/Testimonial');
const mentorshipRouter = require('./routes/Mentorship');
const chapterRouter = require('./routes/Chapter');
const projectsRouter = require('./routes/Projects');

// Keys from Config
const db = require('./config/keys').mongoURI;

const app = express();

if (process.env === 'development') {
	app.use(morgan('dev'));
}

// Implement Cors
app.use(cors());
app.options('*', cors());

// Passport
app.use(passport.initialize());
require('./config/passport')(passport);

// Body parser, reading data from body into req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('working'));

// INITIALIZE ROUTES
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/course', courseRoutes);
app.use('/api/v1/subscribe', subscriberRoutes);

// Connect to New Routes
app.use('/users', userRouter);
app.use('/testimonials', testimonialRouter);
app.use('/mentorships', mentorshipRouter);
app.use('/chapters', chapterRouter);
app.use('/projects', projectsRouter);

module.exports = app;
