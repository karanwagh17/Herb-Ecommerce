import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux"; // Assuming user info is in Redux store
import axios from "axios";
import "../css/orders.css";
import { toast } from "react-toastify";

export default function Orders() {
  const user = useSelector((state) => state.auth.user);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  if(!user ){
    toast.error()
  }
  useEffect(() => {
    if (!user) {
       toast.error("Please login to see your orders.");
    }; 

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_BASEURL}/api/order/user/${user._id}`,
          { withCredentials: true }
        );
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch orders.");
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (!user) {
    return <p>Please login to see your orders.</p>;
  }

  return (
    <div className="orders-container">
      <h2>Orders</h2>
      <p className="breadcrumb">My Account &gt; Orders</p>

      {/* Search & Filter bar - can be wired later */}
      <div className="search-filter-bar">
        <div className="search-box">
          <input type="text" placeholder="Search all orders" />
          <button>
            <span role="img" aria-label="search">
              🔍
            </span>
          </button>
        </div>
        <select>
          <option>All orders</option>
          <option>Delivered</option>
          <option>Processing</option>
        </select>
        <select>
          <option>All time</option>
          <option>Last 30 days</option>
          <option>Last year</option>
        </select>
      </div>

      {/* Loading and error states */}
      {loading && <p>Loading orders...</p>}
      {error && <p className="error">{error}</p>}

      {/* Display orders or no results message */}
      {!loading && orders.length === 0 && (
        <div className="no-results">
          <div className="no-icon">📄</div>
          <h4>No results were found within the period specified</h4>
          <p>Try updating your date range to find a specific order.</p>
        </div>
      )}

      {!loading && orders.length > 0 && (
        <div className="orders-list">
          {orders.map((order) => (
            <div className="order-item" key={order._id}>
              <p>
                <strong>Order ID:</strong> {order._id}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p>
                <strong>Status:</strong> {order.paymentMethod}
              </p>
              <p>
                <strong>Total:</strong> ₹{order.totalPrice?.toFixed(2)}
              </p>
              {/* You can list order items or add more details here */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
