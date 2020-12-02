const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const { Schema } = mongoose;

//validate with regex and load discounts.
const DISCOUNT_TYPE = ['3x2', '3DESC25'];

const DiscountSchema = Schema({
  id: { type: Number, required: true, index: true },
  name: { type: String , required: true },
  discountType: { type: String, enum: DISCOUNT_TYPE, required: true },
}, { _id: false, versionKey: false });

DiscountSchema.plugin(AutoIncrement, {id: 'id_counter', inc_field: '_id'});

module.exports = mongoose.model('Discount', DiscountSchema);
