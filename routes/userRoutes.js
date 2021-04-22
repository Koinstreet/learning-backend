const express = require("express");
import passport from '../DB/passportSetup';

const courseMiddleware = require("../middleware/course");
const authUser = require("../controllers/v1/auth");
const user = require("../controllers/v1/user");

const router = express.Router();

router.post("/signup", authUser.signupUser);
router.post("/login", authUser.loginUser);

router.route('/:id').get(user.getUser);

router.route('/updateProfile/:id').patch(courseMiddleware.uploadUserImage,user.updateUser);


module.exports = router;
