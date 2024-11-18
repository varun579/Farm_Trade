const express= require('express');
const app=express();
const dotEnv=require('dotenv');
const mongoose=require('mongoose')
const Category=require('../Models/Category')
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const secret_key='mysecretkey';
const Product =require('../Models/Product');
const User =require('../Models/UserDetails');


const addCategory= async(req,res)=>
    {
        const {token,category}=req.body
        console.log(token,category)
        try{
          
            const user=jwt.verify(token,secret_key);
            const userEmail=user.email;
            console.log(userEmail);
            const data =await User.findOne({email:userEmail})
            console.log(data)


            const alreadyExists = await Category.findOne({name:category,userId:data._id});
       
            if(alreadyExists)
            {
                return res.send({status:400,data:category+' Category Already Exists'})
            }
            else{


            await Category.create({
               name:category,
               userId:data._id


            })
            return res.send({status:'ok',data:category})
           
           
           }




        }
        catch(err)
        {
            return res.send({error:err})
        }
    }


    const getCategory = async(req,res)=>
        {
            const {token}=req.query;

          // console.log(token)
           try{
                
            const user=jwt.verify(token,secret_key);
            const userEmail=user.email;
            console.log(userEmail);
            const _id =await User.findOne({email:userEmail},{_id:1})
            //console.log(_id)

           const categoryList=await Category.find({userId:_id},{name:1})
          // console.log(categoryList)
         
               return res.send({status:'ok',data:categoryList})


           }
           catch(err)
           {
             return res.send({error:err})
           }

        }


    const deleteCategory =async(req,res)=>
        {
            const {id}=req.query;
            
            console.log(id);
            try
            {
                const deleteList =await Category.findByIdAndDelete(id)
                const subdeleteList = await Product.deleteMany({categoryId:id})
                return res.send({status:'ok'})
            }
            catch(err)
            {
                return res.send({error:err})
            }

        }


    
   const addSubCategory =async(req,res)=>
    {
         const {subname,description,price,quantity,token,categoryId}=req.body;
        //   console.log(subname,description,categoryId)

        //  console.log(typeof price);
        //  console.log(typeof quantity)

         if(isNaN(price) || isNaN(quantity))
            {
                return res.send({status:404,data:'price and quantity must be a number'})
            }

    


         try{
           
            const user=jwt.verify(token,secret_key);
            const userEmail=user.email;
            console.log(userEmail);
            const data=await User.findOne({email:userEmail},{_id:1})
            const alreadyExists = await Product.findOne({subname:subname,userId:data._id});
            console.log(alreadyExists)
            if(alreadyExists)
                {
                    return res.send({status:400,data:subname+' Category Already Exists'})
                }

            await Product.create({
               userId:data._id,
               categoryId: categoryId,
                subname,
                price,
                quantity,
                description
            })

            
          
         
            return res.send({status:'ok',message:'SubCategory created'})


           }
           catch(err)
           {
             return res.send({error:err})
           }
         


    }
    const getSubcategory=async(req,res)=>
        {
            const{id}=req.query;
          

            const subCategoryList = await Product.find({categoryId:id})
          //  console.log(subCategoryList)
           
            return res.send({status:'ok',data:subCategoryList})
        }


    const deleteSubcategory=async(req,res)=>
        {
            const{id}=req.query;

            
            try
            {
                const deleteList = await Product.findByIdAndDelete(id);
                return res.send({status:'ok'})
            }
            catch(err)
            {
                return res.send({error:err})
            }
        }

    const updateSubCategory=async(req,res)=>
    {


        try
        {
            const{price,quantity,productId}=req.body;
            console.log(price,quantity,productId)

           
            if(isNaN(price) || isNaN(quantity))
            {
                return res.send({status:404,data:'price and quantity must be a number'})
            }


            const product = await Product.updateOne({_id:productId},{$set:{quantity:quantity,price:price}})

            return res.send({status:'ok',message:"Item Updated"})
        }
        catch(err)
        {
            return res.send({error:err})
        }
         
         
    }


    module.exports={addCategory,getCategory,deleteCategory,addSubCategory,getSubcategory,deleteSubcategory,updateSubCategory}