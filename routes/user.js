const express=require('express');
const router=express.Router();

const userController=require('../controllers/users_controller')
router.get('/profile',userController.profile);
router.get('/sign-up',userController.signup);
router.get('/sign-in',userController.signin);

router.post('/create',userController.create);
router.post('/createSession',userController.createSession)

module.exports=router;