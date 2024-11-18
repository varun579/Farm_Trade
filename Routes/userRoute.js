const express=require('express');
const route=express.Router();
const multer = require('multer');
const path = require('path');
const userController=require('../Controllers/userController')













const storage = multer.diskStorage({
    destination: './uploads/', 
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });



  
  const upload = multer({
    storage: storage,
    
  })
  



route.get('/userdata',userController.getDetails)
route.post('/update-user',upload.single('profilePic'),userController.updateDetails)
route.get('/get-categorydata',userController.getCategory)
route.get('/get-subcategorydata',userController.getSubCategory)
route.get('/get-farmersdata',userController.getFarmerDetails)
route.post('/addtocart',userController.addToCart)
route.get('/get-cartdetails',userController.getCart)
route.post('/update-cart',userController.updateCart)
route.post('/add-balance',userController.addBalance)
route.get('/get-farmersubcategory',userController.getFarmerSubCategory)
route.post('/add-address',userController.addAddress)
route.get('/get-addresses',userController.getAddress)
route.delete('/delete-address',userController.deleteAddress)
route.post('/update-data',userController.updateData)
route.get('/get-orderdetails',userController.getOrderDetails)
route.get('/get-farmerorders',userController.getFarmerOrderDetails)

module.exports=route;