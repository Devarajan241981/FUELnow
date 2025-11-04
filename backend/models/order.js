const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  address: { type: String, required: true },
  fuelType: { type: String, required: true },
  quantity: { type: Number, required: true },
  paymentMethod: { type: String, default: "N/A" },
  status: { type: String, default: 'pending' }, // Consistency with your frontend
  time: { type: Date, default: Date.now }       // Renamed to time for UI compatibility
});

module.exports = mongoose.model('Order', orderSchema);
