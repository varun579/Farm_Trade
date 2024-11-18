
const mongoose=require('mongoose');


const productsSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId, // Reference to User
      ref: 'User', // The model name of the User collection
       required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId, // Reference to Category
      ref: 'Category', // The model name of the Category collection
      required: true,
    },
    subname:
    {
         type:String,
         required:true
    },
    quantity: {
      type: Number,
      
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  });
  
  
  
  module.exports = mongoose.model('Product', productsSchema);