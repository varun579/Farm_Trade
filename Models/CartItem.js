const mongoose = require('mongoose');

// Define the CartItem schema
const cartItemSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to User
    ref: 'User', // The model name of the User collection
    required: true,
  },
  items:{
    type:[{ 
      
      product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',  // Refers to the Product model
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,  // Ensure that quantity is at least 1
    },
    price:
    {
      type:Number,
      required:true,
    }
  
  
  
  
  
  }]
  },
   createdAt: {
    type: Date,
    default: Date.now,  // Automatically set to the current date
  }
  
});

// Create and export the CartItem model
module.exports = mongoose.model('CartItem', cartItemSchema);
