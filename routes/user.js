const express=require('express');
const router=express.Router();
const passport=require("passport");

const userController=require('../controllers/users_controller')
router.get('/profile/:id',passport.checkAuthentication,userController.profile);
router.post('/update/:id',passport.checkAuthentication,userController.update);
router.get('/sign-up',userController.signup);
router.get('/sign-in',userController.signin);

router.post('/create',userController.create);
router.post('/createSession',passport.authenticate(
    'local',
    {failureRedirect:'/user/sign-in'}
),userController.createSession);
router.get('/sign-out',userController.destroySession);

router.get('/auth/google',passport.authenticate(
    'google',
    {scope:['profile','email']}
))
router.get('/auth/google/callback',passport.authenticate(
    'google',
    {failureRedirect:'/user/sign-in'}
    ),userController.createSession);

module.exports=router;