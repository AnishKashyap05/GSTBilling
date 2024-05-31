// Category Schema
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  gstRate: { type: Number, required: true },
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
