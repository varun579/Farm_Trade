const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  walletBalance: {
    type: Number,
    required: true,
    default: 0
  }
});

module.exports = mongoose.model('Wallet', walletSchema);
