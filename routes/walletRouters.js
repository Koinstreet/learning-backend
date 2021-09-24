const express = require("express");


// NEW CONTROLLERS
const wallet = require("../controllers/v1/wallets");

// MIDDLEWARE
const authMiddleware = require("../middleware/auth");

const router = express.Router();


router.get("/userWallets",authMiddleware.protect, wallet.getAllUserWallets);


router.get("/", wallet.getAllWallet);

router.get("/:id", wallet.getWallet);

router.post(
    "/",
    wallet.createWallet
  );

router.use(authMiddleware.protect);


router
  .route("/:id")
  .patch(wallet.updateWallet)
  .delete(wallet.deleteWallet);

module.exports = router;
