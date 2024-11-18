const express = require('express');
const route =express.Router();
const farmController =require('../Controllers/farmController')





route.post('/add-category',farmController.addCategory)
route.get('/get-category',farmController.getCategory)
route.delete('/delete-category',farmController.deleteCategory)
route.post('/addsub-category',farmController.addSubCategory)
route.get('/get-subcategory',farmController.getSubcategory)
route.delete('/delete-subcategory',farmController.deleteSubcategory)
route.post('/updatesub-category',farmController.updateSubCategory)


module.exports=route;