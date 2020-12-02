const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const { Schema } = mongoose;

const CheckoutItemSchema = Schema({
  token: { type: String, required: true, index: true },
  code: { type: String , required: true },
  quantity: { type: Number },
}, { _id: false, versionKey: false });

CheckoutItemSchema.plugin(AutoIncrement, {id: 'checkout_id_counter', inc_field: '_id'});

module.exports = mongoose.model('CheckoutItem', CheckoutItemSchema);
