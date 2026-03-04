import React from "react";
import "../css/dashboard.css";
import { useSelector } from "react-redux";
import {
  FaUser,
  FaShoppingBag,
  FaInfoCircle,
  FaMapMarkerAlt,
  FaCreditCard,
  FaList,
  FaAward,
  FaWallet,
  FaTag,
  FaHistory,
  FaStar,
  FaQuestionCircle,
  FaComment,
  FaCog,
  FaShieldAlt,
  FaKey
} from "react-icons/fa";

const Sidebar = ({ setActivePage, activePage }) => {
  return (
    <div className="sidebar">
      <ul>
        <li 
          className={activePage === "dashboard" ? "active" : ""} 
          onClick={() => setActivePage("dashboard")}
        >
          <FaUser className="sidebar-icon" /> My Account
        </li>
        <li 
          className={activePage === "orders" ? "active" : ""} 
          onClick={() => setActivePage("orders")}
        >
          <FaShoppingBag className="sidebar-icon" /> Orders
        </li>
        <li 
          className={activePage === "account" ? "active" : ""} 
          onClick={() => setActivePage("account")}
        >
          <FaInfoCircle className="sidebar-icon" /> Account Information
        </li>
        <li 
          className={activePage === "address" ? "active" : ""} 
          onClick={() => setActivePage("address")}
        >
          <FaMapMarkerAlt className="sidebar-icon" /> Address Book
        </li>
        <li>
          <FaCreditCard className="sidebar-icon" /> Payment Methods
        </li>
        <li 
          className={activePage === "lists" ? "active" : ""} 
          onClick={() => setActivePage("lists")}
        >
          <FaList className="sidebar-icon" /> My Lists
        </li>
      </ul>

      <h4>Credits & Savings</h4>
      <ul>
        <li><FaAward className="sidebar-icon" /> My Rewards</li>
        <li><FaWallet className="sidebar-icon" /> Store Credits</li>
        <li><FaTag className="sidebar-icon" /> Sales & Offers</li>
      </ul>

      <h4>My Activity</h4>
      <ul>
        <li><FaHistory className="sidebar-icon" /> My Page</li>
        <li><FaStar className="sidebar-icon" /> My Reviews</li>
        <li><FaQuestionCircle className="sidebar-icon" /> My Questions</li>
        <li><FaComment className="sidebar-icon" /> My Answers</li>
      </ul>

      <h4>Settings</h4>
      <ul>
        <li><FaCog className="sidebar-icon" /> Communications</li>
        <li><FaShieldAlt className="sidebar-icon" /> 2-Step Verification</li>
        <li><FaKey className="sidebar-icon" /> Passkey</li>
      </ul>
    </div>
  );
};

export default Sidebar;