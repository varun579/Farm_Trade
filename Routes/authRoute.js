const express=require('express');
const route=express.Router();
const authController=require('../Controllers/authController')




route.post('/register',authController.RegisterController)
route.post('/login-user',authController.LoginController);

module.exports=route;