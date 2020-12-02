const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const { Schema } = mongoose;

const ProductSchema = Schema({
  code: { type: String, required: true, index: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  discounts: [{ 
    type: Schema.Types.Number, ref: 'Discount', required: false 
  }],
}, { _id: false, versionKey: false });

ProductSchema.plugin(AutoIncrement, {id: 'product_counter', inc_field: '_id'});


module.exports = mongoose.model('Product', ProductSchema);
