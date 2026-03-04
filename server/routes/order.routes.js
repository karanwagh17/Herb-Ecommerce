const express = require("express");
const orderController = require("../controllers/order.controller");
const orderRouter = express.Router();

orderRouter.post("/create", orderController.createOrder);
orderRouter.get("/user/:userId", orderController.getOrdersByUser);
orderRouter.get("/all", orderController.getAllOrders); 

module.exports = orderRouter;
