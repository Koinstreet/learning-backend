const express = require("express");
import passport from '../DB/passportSetup';

const courseMiddleware = require("../middleware/fileUploaders");
const authUser = require("../controllers/v1/auth");
const user = require("../controllers/v1/user");

// MIDDLEWARE
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.route('/:username').get(user.getUsername);

router.post("/signup", authUser.signupUser);
router.post("/login", authUser.loginUser);

router.get("/", authUser.getAllUser)

router.get("/search/:query", user.searchUsersByName);

router.route('/:id').get(user.getUser);


router.use(authMiddleware.protect);

router.route('/updateProfile/:id').patch(courseMiddleware.uploadUserImage,user.updateUser);


module.exports = router;
