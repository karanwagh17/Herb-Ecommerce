import React, { useState } from "react";
import axios from "axios";
import "../css/AddressForm.css";
import { useDispatch, useSelector } from "react-redux";
import { addressUpdateSuccess } from "../redux/slice/authSlice";

export default function AddressForm({ onCancel, onSuccess }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    country: "India",
    fullName: "",
    address1: "",
    address2: "",
    landmark: "",
    colony: "",
    state: "",
    zip: "",
    phone: "",
  });

  const user = useSelector((state) => state.auth.user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?._id) {
       toast.error("User not logged in.");
     
      return;
    }

    try {
      const response = await axios.patch(
        `http://localhost:9999/api/user/updateUserdata/${user._id}`,
        { address: formData },
        {
          withCredentials: true,
        }
      );
      dispatch(addressUpdateSuccess(response.data.updatedUser));
      // alert("Address saved successfully!");
       toast.success("Address saved successfully!");
      // console.log("Updated user:", response.data);
      if (onSuccess) onSuccess(response.data.updatedUser);
    } catch (error) {
      console.error("Error saving address:", error);
      toast.error("Something went wrong while saving address.");
    }
  };

  return (
    <form className="address-form" onSubmit={handleSubmit}>
      <select name="country" value={formData.country} onChange={handleChange}>
        <option value="India">India</option>
        <option value="USA">USA</option>
        <option value="UK">UK</option>
      </select>

      <input
        type="text"
        name="fullName"
        placeholder="Full Name (No business or company name)*"
        value={formData.fullName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="address1"
        placeholder="Address Line 1*"
        value={formData.address1}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="address2"
        placeholder="Address Line 2"
        value={formData.address2}
        onChange={handleChange}
      />
      <input
        type="text"
        name="landmark"
        placeholder="Major landmarks"
        value={formData.landmark}
        onChange={handleChange}
      />
      <input
        type="text"
        name="colony"
        placeholder="Colony/Area name*"
        value={formData.colony}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="state"
        placeholder="State/Region*"
        value={formData.state}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="zip"
        placeholder="Zip/Postal Code*"
        value={formData.zip}
        onChange={handleChange}
        required
      />
      <input
        type="tel"
        name="phone"
        placeholder="Mobile Number/Billing Phone Number*"
        value={formData.phone}
        onChange={handleChange}
        required
      />

      <div className="btn-row">
        <button type="button" className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="save-btn">
          Save
        </button>
      </div>
    </form>
  );
}
