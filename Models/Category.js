const mongoose=require('mongoose');


// Categories Schema

const categoriesSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId, // Reference to User
      ref: 'User', // The model name of the User collection
      required: true,
    },
  });
  
  
  
  module.exports = mongoose.model('Category', categoriesSchema);