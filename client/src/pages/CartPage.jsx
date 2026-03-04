import React, { useEffect, useState } from "react";
import "../css/CartPage.css";
import { FaTrashAlt, FaRegSave } from "react-icons/fa";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../redux/slice/cartSlice";
import { Link } from "react-router-dom";

export default function ShoppingCart() {
  const user = useSelector((store) => store.auth.user);
  const [cartData, setCartData] = useState([]);
  const dispatch = useDispatch();

  const getCartData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASEURL}/api/cart/getCartProducts/${user?._id}`,
        { withCredentials: true }
      );
      const updated = res.data.map((item) => ({
        ...item,
        price: parseFloat(item.price),
      }));
      setCartData(updated);
      dispatch(addCart(updated));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCartData();
  }, []);

  const confirmDelete = (productId, productName) => {
    const isConfirmed = window.confirm(`Are you sure you want to remove "${productName}" from your cart?`);
    
    if (isConfirmed) {
      cartDelete(productId);
    }
  };

  const cartDelete = async (productId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BASEURL}/api/cart/deleteCart`,
        {
          withCredentials: true,
          data: {
            userId: user?._id,
            productId: productId,
          },
        }
      );
      getCartData();
     
       toast.success("Item removed from cart");
    } catch (error) {
      console.error(error);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BASEURL}/api/cart/updateCart`,
        {
          userId: user?._id,
          productId: productId,
          quantity: parseInt(quantity),
        },
        { withCredentials: true }
      );
      getCartData();
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const totalPrice = cartData.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="shopping-cart-container">
      <div className="cart-left">
        <h2>Shopping cart ({cartData?.length})</h2>

        {/* <label className="select-all">
          <span>Select all</span>
        </label> */}

        {cartData.length > 0 ? (
          cartData.map((item) => (
            <div className="cart-item" key={item.productId}>
              <img src={item.image[0]} alt={item.title} />
              <div className="item-details">
                <span className="tag">Save 10% in cart</span>
                <h4>{item.title}</h4>
                <div className="actions">
                  <select
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.productId, e.target.value)
                    }
                  >
                    {[...Array(10).keys()].map((i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                  <FaTrashAlt
                    className="icon"
                    onClick={() => confirmDelete(item.productId, item.title)}
                    title="Remove from cart"
                  />
                  <FaRegSave className="icon" title="Save for later" />
                  {/* <button className="save-btn">Save for later</button> */}
                </div>
              </div>
              <div className="price">
                <p className="discounted">₹{item.price * item.quantity}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>

      <div className="cart-right">
        <div className="summary">
          <h5>Order summary</h5>
          <div className="line">
            <span>Items total ({cartData.length})</span>
            <span>₹{totalPrice.toFixed(2)}</span>
          </div>
          <div className="line">
            <span>Discounts</span>
            <span className="red">-₹{(totalPrice * 0.1).toFixed(2)}</span>
          </div>
          <div className="line sub">
            <span>Subtotal</span>
            <span>₹{(totalPrice * 0.9).toFixed(2)}</span>
          </div>
          <div className="line">
            <span>Rewards Credit</span>
            <span>₹0.00</span>
          </div>
          <div className="line total">
            <span>Total</span>
            <span>₹{(totalPrice * 0.9).toFixed(2)}</span>
          </div>
          <Link to="/checkout" className="checkout-link">
            <button className="checkout-btn">Proceed to Checkout</button>
          </Link>
        </div>
      </div>
    </div>
  );
}