const express= require('express');
const app=express();
const dotEnv=require('dotenv');
const mongoose=require('mongoose')
const User=require('../Models/UserDetails')
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const secret_key='mysecretkey';
const Wallet =require('../Models/Wallet')



const RegisterController = async(req,res)=>
    {
        const {name,email,password,userType,mobile}=req.body;
        console.log(name,email,mobile)
    
        const oldUser=await User.findOne({email});
        console.log(oldUser);
        
        if(oldUser)
            {
                return res.send({data:"User already exists!!"});
            }
    
       const hashpassword= await bcrypt.hash(password,10);
        
        try{
            await User.create({
                name:name,
                email:email,
                password:hashpassword,
                userType,
                mobile
            })

            const user=await User.findOne({email:email})
            //console.log(user);

            await Wallet.create(
                {
                    userId:user._id
                  

                }
              
              )
     
            res.json({status:'ok',data:"user Registered Successfully"})
        }
        catch(error)
        {
          res.send({status:"error",data:error});
        }
    }


const LoginController=async(req,res)=>
    {
        const {email,password}=req.body;
        console.log(email,password)
        const oldUser=await User.findOne({email});
        
    
        if(!oldUser)
            {
                return res.send({data:"User doesn't exists"});
            }
    
        const checkpassword = await bcrypt.compare(password,oldUser.password);
    
        if(checkpassword)
            {
                 const token=jwt.sign({
                    email:oldUser.email,
                 },secret_key);


                 
              
                 
      

                // console.log(oldUser.name);
               return res.send({status:'ok',data:token,userType:oldUser.userType});
                    
                 
            }
        else{
            return res.send({status:404,data:"password is incorrect"})
        }
    }



    module.exports = {RegisterController,LoginController}
    
    
