import React, { useEffect } from "react";
import "../css/Admin.Dash.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  getallordersForadminError,
  getallordersForadminStart,
  getallordersForadminSuccess
} from "../redux/slice/order";

const AdminDash = () => {
  const dispatch = useDispatch();
  const { orders = [], loading, error } = useSelector(
    (store) => store.order
  );


  const getAllOrders = async () => {
    try {
      dispatch(getallordersForadminStart());

      const res = await axios.get(
        `${import.meta.env.VITE_BASEURL}/api/order/all`,
        { withCredentials: true }
      );

      const data = Array.isArray(res.data)
        ? res.data
        : res.data.orders || [];

      dispatch(getallordersForadminSuccess(data));
    } catch (err) {
      dispatch(
        getallordersForadminError(
          err.response?.data?.message || "Something went wrong"
        )
      );
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  const totalOrders = orders.length;

  const totalRevenue = orders.reduce(
    (acc, item) => acc + Number(item.totalPrice || 0),
    0
  );

  const pendingOrders = orders.filter(
    (item) => item.orderStatus === "Pending"
  ).length;

  const deliveredOrders = orders.filter(
    (item) => item.orderStatus === "Delivered"
  ).length;

  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className="main-content">
      <div className="dashboard-box">
        <h2>Admin Dashboard</h2>
        <p>Orders Overview 👇</p>
      </div>

      {loading && <p>Loading orders...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* ================= Stats Section ================= */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginTop: "20px"
        }}
      >
        <div className="card-box">
          <h3>Total Ordered users</h3>
          <p className="card-number">{totalOrders}</p>
        </div>

        <div className="card-box">
          <h3>Total Revenue</h3>
          <p className="card-number">₹{totalRevenue.toFixed(2)}</p>
        </div>

        <div className="card-box">
          <h3>Pending Orders</h3>
          <p className="card-number">{pendingOrders}</p>
        </div>

        <div className="card-box">
          <h3>Delivered Orders</h3>
          <p className="card-number">{deliveredOrders}</p>
        </div>
      </div>

      {/* ================= Recent Orders ================= */}
      <div style={{ marginTop: "40px" }}>
        <h3>Recent Orders</h3>

        <div className="card-box">
          {recentOrders.length === 0 ? (
            <p>No orders found</p>
          ) : (
            recentOrders.map((order) => (
              <div
                key={order._id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px 0",
                  borderBottom: "1px solid #eee"
                }}
              >
                <span>#{order._id?.slice(-6)}</span>

                <span>
                  ₹{Number(order.totalPrice || 0).toFixed(2)}
                </span>

                <span
                  style={{
                    fontWeight: "bold",
                    color:
                      order.orderStatus === "Delivered"
                        ? "green"
                        : order.orderStatus === "Pending"
                        ? "orange"
                        : "red"
                  }}
                >
                  {order.orderStatus || "Placed"}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDash;