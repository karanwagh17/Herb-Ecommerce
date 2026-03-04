const OrderModel = require("../models/order.model");

const orderController = {
  createOrder: async (req, res) => {
    const { userId, products, totalPrice, address, paymentMethod } = req.body;
    if (!userId || !products || !totalPrice || !address || !paymentMethod) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      const newOrder = new OrderModel({
        userId,
        products,
        totalPrice,
        address,
        paymentMethod
      });

      await newOrder.save();
      res.status(201).json({ message: "Order placed successfully", order: newOrder });
    } catch (error) {
      res.status(500).json({ message: "Error placing order", error });
    }
  },

  getOrdersByUser: async (req, res) => {
    try {
      const { userId } = req.params;
      const orders = await OrderModel.find({ userId });
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: "Error fetching orders", error });
    }
  },

  getAllOrders: async (req, res) => {
    try {
      const orders = await OrderModel.find().sort({ createdAt: -1 });
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: "Error fetching all orders", error });
    }
  }
};

module.exports = orderController;
