import React from "react";
// import "../css/accountDropdown.css";
import { Link } from "react-router";
import "../css/navDrop.css";
import {
  FaUser,
  FaClipboardList,
  FaListAlt,
  FaDollarSign,
  FaStar,
  FaCommentDots,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../redux/slice/authSlice";
import { addCart } from "../redux/slice/cartSlice";

const AccountDropdown = () => {
  const { user, isAuth } = useSelector((store) => store.auth);

  const dispatch = useDispatch();
  const logout = async (e) => {
    dispatch(addCart([]));
    e.preventDefault();
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASEURL}/api/user/logout`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      dispatch(logoutSuccess());

      if (res.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="account-dropdown-panel">
      <div className="rewards-box">
        <h5>
          HERB | <strong>REWARDS</strong>
        </h5>
        <p>
          <strong>$80.6M+</strong>
          <br />
          Credits rewarded in 2024
        </p>
        <p>
          <strong>2.7M+</strong>
          <br />
          Free or partially free orders
        </p>
        <a href="#">Learn More &gt;</a>
      </div>

      <div className="account-actions">
        <h5 className="welcome-heading">Welcome! {user?.name}</h5>
        <ul>
          <Link to="/account">
            <li>
              <FaUser /> My Account
            </li>
          </Link>
          <Link to="/account">
            <li>
              <FaClipboardList /> Orders
            </li>
          </Link>
          <Link to="/account">
            <li>
              <FaListAlt /> My Lists
            </li>
          </Link>

          <Link to="/account">
            <li>
              <FaDollarSign /> Rewards Credit
            </li>
          </Link>

          <Link to="/account">
            <li>
              <FaStar /> My Reviews
            </li>
          </Link>
          <Link to="/account">
            <li>
              <FaCommentDots /> Messages
            </li>
          </Link>
        </ul>
        {isAuth ? (
          <button
            style={{ color: "white", textDecoration: "none" }}
            className="sign-button"
            onClick={(e) => logout(e)}
          >
            {" "}
            signout{" "}
          </button>
        ) : (
          <Link to="/login" style={{ color: "white", textDecoration: "none" }}>
            <button className="sign-button">Sign in/Create an account </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default AccountDropdown;
