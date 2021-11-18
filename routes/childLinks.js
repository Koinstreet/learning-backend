const express = require('express');
const ChildLinksControllers = require('../controllers/v1/chilLinks/index.js')
const authMiddleware = require("../middleware/auth");

const router = express.Router();


router.use(authMiddleware.protect);

router.get('/', ChildLinksControllers.ChildLinkGet);

router.use(authMiddleware.restrictTo("admin"));

router.post('/', ChildLinksControllers.ChildLinkPost);

router.patch('/:id', ChildLinksControllers.ChildLinkUpdate);

router.delete('/:id', ChildLinksControllers.ChildLinkDelete);

module.exports = router