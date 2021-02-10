const express = require("express");

// Controllers
const subscriberController = require("../controllers/subscriberController");

const router = express.Router();

router
.get('/', subscriberController.getAllSubscriber)
.post('/', subscriberController.addSubscriber);

module.exports = router;