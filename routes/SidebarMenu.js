const express = require('express');
const SidebarConrollers = require('.././controllers/v1/sidebarMenu/index')
const authMiddleware = require("../middleware/auth");



const router = express.Router();

router.use(authMiddleware.protect);

router.get('/', SidebarConrollers.SidebarGet);

router.post('/', SidebarConrollers.SidebarPost);

router.patch('/:id', SidebarConrollers.SidebarUpdate);

router.delete('/:id', SidebarConrollers.SidebarDelete);


module.exports = router