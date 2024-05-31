// models/Sale.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const saleSchema = new Schema({
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  totalPrice: { type: Number, required: true }
});

module.exports = mongoose.model('Sale', saleSchema);
