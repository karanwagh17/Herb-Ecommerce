const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
  userId: { type: String, required: true },
  products: [
    {
      productId: { type: String, required: true },
      quantity: { type: Number, default: 1 },
      price: { type: Number, required: true },
      title: { type: String, required: true },
      image: [{ type: String }]
    }
  ],
  address: {
    type: Object,
    required: true
  },
  totalPrice: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const OrderModel = model("Order", orderSchema);
module.exports = OrderModel;
