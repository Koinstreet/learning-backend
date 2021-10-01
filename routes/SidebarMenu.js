const express = require('express');
const SidebarConrollers = require('.././controllers/v1/sidebarMenu/index')




const router = express.Router();


router.get('/', SidebarConrollers.SidebarGet);

router.post('/', SidebarConrollers.SidebarPost);


module.exports = router