const mongoose = require('mongoose');

// Define the WishlistItems schema
const wishlistItemSchema = new mongoose.Schema({
  wishlist_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Wishlist',  // Refers to the Wishlist model
    required: true,
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',  // Refers to the Product model
    required: true,
  }
});

// Create and export the WishlistItem model
module.exports = mongoose.model('WishlistItem', wishlistItemSchema);
