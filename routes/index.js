const express=require('express');
const router=express.Router();

module.exports=router;

const homeController=require('../controllers/home_controller.js');
router.get('/',homeController.home);

router.use('/users', require('./users.js'));
router.use('/posts', require('./posts.js'));