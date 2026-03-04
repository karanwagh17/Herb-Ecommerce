import React, { useState, useEffect } from "react";
import "../css/checkout.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";
import { addCart } from "../redux/slice/cartSlice";

const CheckoutPage = () => {
  const cartProducts = useSelector((state) => state.cart.cartProduct);
  const user = useSelector((state) => state.auth.user);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState("gpay");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    getCartData();
  }, [user]);

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
      dispatch(addCart(updated));
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;
    try {
      await axios.put(
        `${import.meta.env.VITE_BASEURL}/api/cart/updateCart`,
        {
          userId: user._id,
          productId,
          quantity,
        },
        { withCredentials: true }
      );
      await getCartData();
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const deleteItem = async (productId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BASEURL}/api/cart/deleteCart`,
        {
          withCredentials: true,
          data: {
            userId: user._id,
            productId,
          },
        }
      );
      await getCartData();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handlePayment = async (method) => {
    const confirmed = window.confirm(
      "Are you sure you want to place this order?"
    );
    if (!confirmed) return;

    if (!user.address || user.address.length === 0) {
      // alert("Please add a delivery address before placing the order.");
      toast.error("Please add a delivery address before placing the order.");
      navigate("/address");
      return;
    }

    if (cartProducts.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    const orderPayload = {
      userId: user._id,
      products: cartProducts.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        title: item.title,
        image: item.image,
      })),
      totalPrice: totalPrice + 200 + 164.61, 
      address: user.address[selectedAddressIndex],
      paymentMethod: method,
    };

    try {
      await axios.post(
        `${import.meta.env.VITE_BASEURL}/api/order/create`,
        orderPayload,
        { withCredentials: true }
      );
      toast.success(`Order placed successfully using ${method}!`);
      dispatch(addCart([])); // Clear cart
      navigate("/orders");
    } catch (error) {
      console.error("Order placement failed:", error);
      toast.error("Failed to place order. Please try again.");
    }
  };

  const totalPrice = cartProducts.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const paymentOptions = [
    {
      id: "gpay",
      label: "Google Pay",
      img: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202105/Google-Pay-hero_1.jpg",
    },
    {
      id: "paytm",
      label: "Paytm",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnWUpB054yZ_CCHLG7JvYlMGQrQUFtDbgY7w&s",
    },
    {
      id: "upi",
      label: "UPI",
      img: "https://cdn.iconscout.com/icon/free/png-256/free-upi-logo-icon-download-in-svg-png-gif-file-formats--unified-payments-interface-payment-money-transfer-logos-icons-1747946.png?f=webp&w=256&q=60",
    },
    {
      id: "cod",
      label: "Cash on Delivery",
      img: "https://cdn-icons-png.flaticon.com/512/8089/8089838.png",
    },
  ];

  return (
    <div className="checkout-container">
      <div className="checkout-wrapper">
        {/* LEFT SIDE */}
        <div className="checkout-left">
          {/* Shipping Info */}
          <div className="checkout-box">
            <div className="checkout-header">
              <h2 className="font-bold">Shipping information</h2>
              <button
                className="change-btn"
                onClick={() => navigate("/address")}
              >
                Add Address
              </button>
            </div>
            {user?.address && user.address.length > 0 ? (
              <div>
                <h3>Select Delivery Address:</h3>
                {user.address.map((addr, index) => (
                  <label key={index} className="address-option">
                    <input
                      type="radio"
                      name="selectedAddress"
                      value={index}
                      checked={selectedAddressIndex === index}
                      onChange={() => setSelectedAddressIndex(index)}
                    />
                    <div>
                      <strong>{addr.fullName}</strong>
                      <p>
                        {addr.address1}, {addr.address2 && `${addr.address2}, `}
                        {addr.colony}, {addr.landmark && `${addr.landmark}, `}
                        {addr.state} - {addr.zip}
                      </p>
                      <p>{addr.country}</p>
                      <p>Phone: {addr.phone}</p>
                    </div>
                  </label>
                ))}
              </div>
            ) : (
              <p>No address provided</p>
            )}
          </div>

          {/* Payment */}
          <div className="checkout-box">
            <div className="checkout-header">
              <h2 className="font-bold">Payment method</h2>
              {/* If you want to implement change button, add logic here */}
              <button className="change-btn" disabled>
                Change
              </button>
            </div>
            <div className="payment-options">
              {paymentOptions.map((option) => (
                <label key={option.id} className="payment-option">
                  <input
                    type="radio"
                    name="payment"
                    value={option.id}
                    checked={selectedPayment === option.id}
                    onChange={() => setSelectedPayment(option.id)}
                  />
                  <img src={option.img} alt={option.label} />
                  <p className="font-bold">{option.label}</p>
                </label>
              ))}
            </div>
          </div>

          {/* Items */}
          <div className="checkout-box">
            <div className="checkout-header">
              <h2 className="font-bold">{cartProducts?.length} item(s)</h2>
            </div>
            {cartProducts.map((item) => (
              <div className="item" key={item.productId}>
                <img src={item.image[0]} alt={item.title} />
                <div className="item-info">
                  <p className="text-secondary font-bold">{item?.title}</p>
                  <div className="quantity">
                    <button
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                  <div className="item-actions">
                    <button onClick={() => deleteItem(item.productId)}>
                      Remove
                    </button>
                  </div>
                </div>
                <div className="item-price">
                  <p className="font-bold">₹{item.price * item.quantity}</p>
                  <p className="line-through">
                    ₹{(item.price * item.quantity * 1.2).toFixed(2)}
                  </p>
                  <p className="discount">
                    Discounts: -₹
                    {(item.price * item.quantity * 0.2).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="checkout-right">
          <h2 className="summary-title">Order summary</h2>
          <div className="summary-section">
            <div className="summary-line">
              <p>Items total</p>
              <p>₹{totalPrice.toFixed(2)}</p>
            </div>
            <div className="summary-line discount-text">
              <p>Product discounts</p>
              <p>₹{(totalPrice * 1.2).toFixed(2)}</p>
            </div>
            <p className="coupon">JUN25BBPC Applied</p>
            <div className="summary-line bold">
              <p>Subtotal</p>
              <p>₹{totalPrice.toFixed(2)}</p>
            </div>
            <div className="summary-line">
              <p>Shipping</p>
              <p>₹200.00</p>
            </div>
            <div className="summary-line">
              <p>Duties & Taxes</p>
              <p>₹164.61</p>
            </div>
            <hr />
            <div className="summary-line total">
              <p>Total</p>
              <p>₹{(totalPrice + 200 + 164.61).toFixed(2)}</p>
            </div>
          </div>

          {/* Final Payment Button */}
          {paymentOptions.map(
            (option) =>
              selectedPayment === option.id && (
                <button
                  key={option.id}
                  className="gpay-btn"
                  onClick={() => handlePayment(option.label)}
                >
                  <img src={option.img} alt={option.label} />
                  Pay with {option.label}
                </button>
              )
          )}

          <p className="terms-text">
            By clicking "Place Order", you agree to HERB’s{" "}
            <a href="#">Terms of Use</a>, <a href="#">Refund Policy</a>, and{" "}
            <a href="#">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
