const express = require("express");

const cartRouter = express.Router();
const cartController = require("../controllers/cart.controller");
const isAuth = require("../middleware/isAuth");

cartRouter.post("/addtocart", isAuth, cartController.addToCart);
cartRouter.get(
  "/getCartProducts/:userId",
  isAuth,
  cartController.getCartProducts
);
cartRouter.put("/updateCart", isAuth, cartController.updatequantity);
cartRouter.delete("/deleteCart", isAuth, cartController.deleteCart);

module.exports = cartRouter;
