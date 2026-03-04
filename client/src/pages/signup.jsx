import React, { useState, useEffect } from "react";
import "../css/login.css";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  signuperror,
  signupStart,
  signupSuccess,
  resetAuthState,
} from "../redux/slice/authSlice";
import Loading from "../components/Loading";

const Signup = () => {
  const [Email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setphone] = useState("");
  const navigate = useNavigate();
  const { loading, error } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetAuthState());
  }, [dispatch]);

  const hendelSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signupStart());
      const res = await axios.post(
        `http://localhost:9999/api/user/signup`,
        {
          email: Email,
          name,
          password,
          phone,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(signupSuccess(res.data));
      navigate("/otp");
    } catch (error) {
      dispatch(
        signuperror(
          error.response?.data?.message || "Signup failed. Please try again."
        )
      );
    }
  };

  return (
    <div className="login-container">
      {loading && <Loading />}
      <div className="login-box">
        <form className="login-left" onSubmit={hendelSubmit}>
          <h2>Create your HERB account</h2>
          <p>Please fill in the details below to create your account.</p>
          {error && <div className="error-message">{error}</div>}
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="login-input"
            required
          />
          <input
            type="email"
            value={Email}
            placeholder="Email address"
            className="login-input"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="tel"
            value={phone}
            placeholder="Mobile number"
            className="login-input"
            onChange={(e) => setphone(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required
            minLength={6}
          />
          <button className="continue-btn" type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
          <div className="help-text">
            Already have an account? : <Link to="/login"> Login</Link>{" "}
          </div>
          <p className="terms-text">
            By creating an account, you agree to our{" "}
            <span className="link">Terms and Conditions</span> and{" "}
            <span className="link">Privacy Policy</span>.
          </p>
        </form>
        <div className="login-right">
          <h3>Why join HERB?</h3>
          <ul className="features-list">
            <li>Exclusive discounts and promotions</li>
            <li>Faster checkout experience</li>
            <li>Track your orders easily</li>
            <li>Earn Rewards and loyalty credits</li>
            <li>Save favorite products and more</li>
          </ul>
          <div className="ratings">
            <div>
              <strong>4.8 ★★★★★</strong>
              <br />
              HERB
              <br />
              Store Reviews
            </div>
            <div>
              <strong>4.8 ★★★★★</strong>
              <br />
              Google
              <br />
              Customer Reviews
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
