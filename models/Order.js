const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: {
          type: String,
        },
        itemQuantity: {
          type: Number,
        },
        name: {
          type: String,
        },
        price: {
          type: Number,
        },
        category: {
          type: String,
        },
        brand: {
          type: String,
        },
        modelNo: {
          type: String,
        },
        skuNo: {
          type: String,
        },
      },
    ],
    userName: { type: String, required: true },
    amount: { type: Number, required: true },
    address: { type: String, required: true },
    isPaid: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
