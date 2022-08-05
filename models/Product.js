const mongoose = require('mongoose');
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      default: 0,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    subCategory: {
      type: String,
      default: null,
    },

    countInStock: {
      type: Number,
      required: true,
      min: 0,
    },

    brand: {
      type: String,
      required: true,
    },
    modelNo: {
      type: String,
      default: null,
      required: true,
    },
    skuNo: {
      type: String,
      default: null,
      required: true,
    },

    image: {
      type: String,
      required: [true, 'Upload your picture please'],
    },

    type: {
      type: String,
    },

    rating: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
