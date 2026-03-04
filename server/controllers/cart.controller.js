const Cart = require("../models/cart.model");

const cartcontroller = {
  addToCart: async (req, res) => {
    const { userId, productId, quantity = 1, price, title, image } = req.body;

    if (!userId || !productId || !price || !title || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      let cart = await Cart.findOne({ userId });
      const parsedPrice = Number(price);

      if (cart) {
        const index = cart.products.findIndex((p) => p.productId === productId);

        if (index > -1) {
          cart.products[index].quantity += parseInt(quantity);
        } else {
          cart.products.push({
            productId,
            quantity: parseInt(quantity),
            price: parsedPrice,
            title,
            image,
          });
        }
        await cart.save();
      } else {
        cart = new Cart({
          userId,
          products: [
            {
              productId,
              quantity: parseInt(quantity),
              price: parsedPrice,
              title,
              image,
            },
          ],
        });
        await cart.save();
      }

      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },

  getCartProducts: async (req, res) => {
    try {
      const cart = await Cart.findOne({ userId: req.params.userId });

      if (!cart) return res.status(404).json({ message: "Cart not found" });

      res.status(200).json(cart.products);
    } catch (error) {
      res.status(400).json({ message: error?.message });
    }
  },

  updatequantity: async (req, res) => {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || quantity === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      const cart = await Cart.findOne({ userId });

      if (!cart) return res.status(404).json({ message: "Cart not found" });

      const productIndex = cart.products.findIndex(
        (p) => p.productId == productId
      );

      if (productIndex === -1)
        return res.status(404).json({ message: "Product not found in cart" });

      cart.products[productIndex].quantity = parseInt(quantity);
      await cart.save();

      res.status(200).json(cart.products[productIndex]);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteCart: async (req, res) => {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      const cart = await Cart.findOne({ userId });

      if (!cart) return res.status(404).json({ message: "Cart not found" });

      const productIndex = cart.products.findIndex(
        (p) => p.productId == productId
      );

      if (productIndex === -1)
        return res.status(404).json({ message: "Product not found in cart" });

      cart.products.splice(productIndex, 1);
      await cart.save();

      res.status(200).json({ message: "Product removed from cart" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = cartcontroller;
