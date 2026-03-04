import React, { useState, useEffect } from "react";
import OtpInput from "react-otp-input";
import "../css/otp.css";
import axios from "axios";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  otpVerificationerror,
  otpVerificationStart,
  otpVerificationSuccess,
  resetAuthState
} from "../redux/slice/authSlice";
import Loading from "../components/Loading";

export default function OtpVerification() {
  const [otp, setOtp] = useState("");
  const { loading, error } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(resetAuthState());
  }, [dispatch]);

  const hendSubmit = async () => {
    dispatch(otpVerificationStart());
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASEURL}/api/user/verify`,
        { otp },
        { withCredentials: true }
      );
      dispatch(otpVerificationSuccess());
      navigate("/login");
    } catch (error) {
      dispatch(
        otpVerificationerror(error.response?.data?.message || "Wrong OTP")
      );
    }
  };

  return (
    <div className="login-container">
      {loading && <Loading />}
      <div className="login-box">
        <div className="login-left">
          <h2>🔐 Verify Your OTP</h2>
          <p>Please enter the 6-digit OTP sent to your email.</p>
          {error && <div className="error-message">{error}</div>}
          <div className="otp-input-container">
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              inputStyle={{width:"30px"}}
              renderSeparator={<span>-</span>}
              renderInput={(props) => <input {...props} />}
              containerStyle={{ justifyContent: "center" }}
            />
          </div>
          <button
            className="continue-btn"
            onClick={hendSubmit}
            disabled={otp.length < 6 || loading}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </div>
        <div className="login-right">
          <h3>Why verify?</h3>
          <ul className="features-list">
            <li>Secure your account</li>
            <li>Access exclusive features</li>
            <li>Complete your signup</li>
            <li>Start shopping with HERB</li>
          </ul>
        </div>
      </div>
    </div>
  );
}