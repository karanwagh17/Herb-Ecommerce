import React from "react";
import {
  FaTachometerAlt,
  FaShoppingCart,
  FaUsers,
  FaPlusSquare,
  FaBoxOpen,
  FaTags,
  FaChartBar,
  FaStar,
  FaCog,
  FaSignOutAlt
} from "react-icons/fa";
import "../css/admin.css";
const AdminSidebar = ({ activePage, setActivePage }) => {
  return (
    <div className="admin-sidebar">
      
      <h2 className="admin-logo">Admin Panel</h2>

      <ul>
        <li
          className={activePage === "dashboard" ? "active" : ""}
          onClick={() => setActivePage("dashboard")}
        >
          <FaTachometerAlt className="sidebar-icon" /> Dashboard
        </li>
          <li
          className={activePage === "addProduct" ? "active" : ""}
          onClick={() => setActivePage("addProduct")}
        >
          <FaPlusSquare className="sidebar-icon" /> Add Product
        </li>
          <li
          className={activePage === "products" ? "active" : ""}
          onClick={() => setActivePage("products")}
        >
          <FaBoxOpen className="sidebar-icon" /> All Products
        </li>
        
        <li
          className={activePage === "users" ? "active" : ""}
          onClick={() => setActivePage("users")}
        >
          <FaUsers className="sidebar-icon" /> Users
        </li>

        <li
          className={activePage === "orders" ? "active" : ""}
          onClick={() => setActivePage("orders")}
        >
          <FaShoppingCart className="sidebar-icon" /> Orders
        </li>
      
      </ul>

      <h4>Marketing</h4>
      <ul>
        <li>
          <FaTags className="sidebar-icon" /> Coupons
        </li>
        <li>
          <FaStar className="sidebar-icon" /> Reviews
        </li>
      </ul>

      <h4>Reports</h4>
      <ul>
        <li>
          <FaChartBar className="sidebar-icon" /> Sales Report
        </li>
      </ul>

      <h4>Settings</h4>
      <ul>
        <li>
          <FaCog className="sidebar-icon" /> Admin Settings
        </li>
        <li>
          <FaSignOutAlt className="sidebar-icon" /> Logout
        </li>
      </ul>

    </div>
  );
};

export default AdminSidebar;