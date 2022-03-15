const express = require("express");
import passport from "../DB/passportSetup";

const courseMiddleware = require("../middleware/fileUploaders");
const authUser = require("../controllers/v1/auth");
const user = require("../controllers/v1/user");

// MIDDLEWARE
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.route("/:username").get(user.getUsername);

router.post("/forgotPassword", authUser.forgotPassword);
router.post("/password-reset/:userId/:token", authUser.resetPassword);

router.post("/signup", authUser.signupUser);
router.post("/login", authUser.loginUser);

router.get("/", authUser.getAllUser);

router.post("/account/create", authUser.createWallet);

router.post("/account/login", authUser.walletLogin);

router.get("/account/get/:publicAddress", authUser.findAccount);

router.get("/search/:query", user.searchUsersByName);

router.route("/getProfile/:id").get(user.getUser);

router.use(authMiddleware.protect);

router
  .route("/updateProfile/:id")
  .patch(courseMiddleware.uploadUserImage, user.updateUser);

router.get("/delete/:id", user.deleteUser);

router.post("/mintProfile", user.mintProfile);

module.exports = router;
