const mongoose = require('mongoose');

// Define the OrderDetails schema
const orderDetailsSchema = new mongoose.Schema({
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',  // Refers to the Order model
    required: true,
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',  // Refers to the Product model
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Refers to the User model
    required: true,
  },
  quantity: {
    type: Number,
    required: true,  // Quantity of the product in the order
  },
  price: {
    type: Number,
    required: true,  // Price of the product
  },
  createdAt: {
    type: Date,
    default: Date.now,  // Automatically set when the order detail is created
  },
  updatedAt: {
    type: Date,
    default: Date.now,  // Automatically set when the order detail is updated
  }
});

// Create and export the OrderDetails model
module.exports = mongoose.model('OrderDetails', orderDetailsSchema);
