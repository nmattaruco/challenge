const mongoose = require('mongoose');

const { Schema } = mongoose;

const CheckoutSchema = Schema({
  id: { type: String, required: true, index: true },
  status: { type: String, default: 'open' },
});

module.exports = mongoose.model('Checkout', CheckoutSchema);
