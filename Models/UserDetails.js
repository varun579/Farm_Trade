const mongoose=require('mongoose');


const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    addresses: {
       type: [
        {
          street: {
        type: String,
      
      },
      city: {
        type: String,

      },
      state: {
        type: String,
   
      },
      postalCode: {
        type: String,
        
      },}], // Array of addresses using addressSchema
      default: [], // Default to an empty array, making it optional
    },
    gender:
    {
       type:String,
    },
    createDate: {
      type: Date,
      default: Date.now, // Automatically set to the current date
    },
    userType: {
      type: String,
      enum: ['User', 'Admin', 'Farmer'], // Example user types
      required: true,
    },
    image:{

      type:String
    }
  });



module.exports=mongoose.model('User',userSchema);















