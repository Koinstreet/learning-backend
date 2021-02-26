const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const authUser = require("../controllers/v1/auth");

const router = express.Router();

// router.post("/signup", authController.signupUser);
// router.post("/login", authController.loginUser);
router.post("/signup", authUser.signupUser);
router.post("/login", authUser.loginUser);

router.route('/:id').get(userController.getUser);

module.exports = router;
