const express=require('express');
const router=express.Router();

module.exports=router;

const homeController=require('../controllers/home_controller.js');
router.get('/',homeController.home);
router.use('/user', require('./user.js'));
router.use('/post',require('./post.js'));
router.use('/comment',require('./comment.js'));
router.use('/api',require('./api'));
