import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaMobileAlt,
  FaLock,
  FaGlobe,
  FaEdit,
  FaTimes,
  FaCheck,
  FaTrash
} from "react-icons/fa";
import { useSelector } from "react-redux";
import axios from "axios";
import "../css/AccountInfo.css"
import { AiOutlineCheckCircle } from "react-icons/ai";
import { toast } from "react-toastify";

const AccountInfo = () => {
  const authUser = useSelector((store) => store.auth.user);
  const [user, setUser] = useState(authUser);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const getUser = async () => {
    if (!authUser?._id) return;

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASEURL}/api/user/getuser/${authUser._id}`,
        { withCredentials: true }
      );
      setUser(res.data);
      setFormData({
        name: res.data.name || "",
        email: res.data.email || "",
        phone: res.data.phone || "",
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    getUser();
  }, [authUser?._id]);

  const latestAddress =
    user?.address?.length > 0 ? user.address[user.address.length - 1] : null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_BASEURL}/api/user/updateUserdata/${authUser._id}`,
        formData,
        { withCredentials: true }
      );
      // alert("User updated successfully");
            toast.success("User updated successfully");
      setIsEditing(false);
      setUser(res.data.updatedUser);
    } catch (error) {
      console.error("Update error:", error);
       toast.error("Update failed");
    }
  };

  return (
    <div className="account-container">
      <div className="account-card">
        <div className="account-header">
          <h2>Account Information</h2>
          <p>Manage your personal details and preferences</p>
        </div>

        <div className="account-content">
          <div className="info-section">
            <div className="info-item">
              <div className="info-icon">
                <FaUser />
              </div>
              <div className="info-content">
                <label>Full Name</label>
                <p>{user?.name || "Not provided"}</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <FaEnvelope />
              </div>
              <div className="info-content">
                <label>Email Address</label>
                <p>{user?.email || "Not provided"}</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <FaMobileAlt />
              </div>
              <div className="info-content">
                <label>Mobile Number</label>
                <p>{user?.phone || "Not provided"}</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <FaLock />
              </div>
              <div className="info-content">
                <label>Password</label>
                <p className="masked">••••••••</p>
              </div>
            </div>

            {latestAddress && (
              <div className="info-item">
                <div className="info-icon">
                  <FaGlobe />
                </div>
                <div className="info-content">
                  <label>Latest Address</label>
                  <p>
                    {latestAddress.address1}, {latestAddress.colony},{" "}
                    {latestAddress.state}, {latestAddress.zip}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="action-buttons">
            <button 
              className={`edit-btn ${isEditing ? 'cancel' : ''}`}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? (
                <>
                  <FaTimes /> Cancel
                </>
              ) : (
                <>
                  <FaEdit /> Edit Information
                </>
              )}
            </button>
          </div>

          {isEditing && (
            <form onSubmit={handleSubmit} className="edit-form">
              <h3>Update Your Information</h3>
              
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  disabled
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="save-btn">
                  <FaCheck /> Save Changes
                </button>
              </div>
            </form>
          )}

          <div className="danger-zone">
            <h3>Danger Zone</h3>
            <p>Once you delete your account, there is no going back. Please be certain.</p>
            <button className="delete-btn">
              <FaTrash /> Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;