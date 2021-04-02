// Research if helmet and multer is needed
// const helmet = require('helmet');
// app.use(helmet());

const express = require('express');
let router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// research if keys can be changed to .env file since no longer using next.js
const keys = require('../config/keys');

// Load input validation not sure if this is needed since validation is set up in schema
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

// Load User model
const User = require('../model/User');

// @route POST /users/register
// @desc Register user
// @access Public
router.post('/register', (req, res) => {
	// Form validation
	const { errors, isValid } = validateRegisterInput(req.body);

	// Check validation
	if (!isValid) {
		return res.status(400).json(errors);
	}
	User.findOne({ email: req.body.email }).then((user) => {
		if (user) {
			return res.status(400).json({ email: 'Email already exists' });
		} else {
			const newUser = new User({
				name: req.body.name,
				email: req.body.email,
				password: req.body.password,
				date: req.body.date,
				birthday: req.body.birthday,
				age: req.body.age,
				phone_number: req.body.phone_number,
				gradyr: req.body.gradyr,
				experience: req.body.experience,
				picture: req.body.picture,
				iq: req.body.iq,
				eq: req.body.eq,
				ethnicity: req.body.ethnicity,
				natural_languages: req.body.natural_languages,
				hometown: req.body.hometown,
				current_location: req.body.current_location,
				is_deleted: req.body.is_deleted,
				passions: req.body.passions,
			});

			// Hash password before saving in database
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err;
					newUser.password = hash;
					newUser
						.save()
						.then((user) => res.json(user))
						.catch((err) => console.log(err));
				});
			});
		}
	});
});

// @route POST /users/login
// @desc Login user and return JWT token
// @access Public
router.post('/login', (req, res) => {
	// Form validation
	const { errors, isValid } = validateLoginInput(req.body);

	// Check validation
	if (!isValid) {
		return res.status(400).json(errors);
	}
	const email = req.body.email;
	const password = req.body.password;

	// Find user by email
	User.findOne({ email }).then((user) => {
		// Check if user exists
		if (!user) {
			return res.status(404).json({ emailnotfound: 'Email not found' });
		}

		// Check password
		bcrypt.compare(password, user.password).then((isMatch) => {
			if (isMatch) {
				// User matched
				// Create JWT Payload
				const payload = {
					id: user.id,
					name: user.name,
				};

				// Sign token
				jwt.sign(
					payload,
					keys.secretOrKey,
					{
						expiresIn: 31556926, // 1 year in seconds
					},
					(err, token) => {
						res.json({
							success: true,
							token: 'Bearer ' + token,
						});
					},
				);
			} else {
				return res
					.status(400)
					.json({ passwordincorrect: 'Password incorrect' });
			}
		});
	});
});

module.exports = router;
