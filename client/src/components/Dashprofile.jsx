import React, { useEffect, useState } from "react";
import "../css/Dashprofile.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { signinSuccess } from "../redux/slice/authSlice";

export default function DashboardComp() {
  const [file, setFile] = useState(null);

  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      console.log("User not authenticated");
    }
  }, [user]);

  const hendleSubmit = async () => {
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_BASEURL}/api/user/updateUserdata/${user?._id}`,
        {
          image: file,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch(signinSuccess(res.data.updatedUser));
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dashboard-main">
      <div className="dashboard-header">
        <div className="user-info">
          <div className="user-avatar">
            <img
              src={
                (user?.image && `http://localhost:9999/${user.image}`) ||
                "https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-male-user-profile-vector-illustration-isolated-background-man-profile-sign-business-concept_157943-38764.jpg"
              }
              alt="User Avatar"
              style={{
                border: "1px solid black",
                width: "100px",
                height: "100px",
                borderRadius: "50%",
              }}
            />
            <br />
            <label className="upload-label">
              <input
                type="file"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
              <span className="change-image-btn">Change Image</span>{" "}
              <button type="submit" onClick={() => hendleSubmit()}>
                {" "}
                update
              </button>
            </label>
          </div>

          <div>
            <h4>Hey, {user?.email || "User"}</h4>
            <p>
              Customer since{" "}
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </div>

        <div className="rewards-box">
          <p>
            <strong>Rewards available</strong>
          </p>
          <p>$0.00</p>
          <p className="small-text">Rule updated</p>
          <p>
            Rewards Code: <span className="code">NNO0811</span>
            <span className="share-icon">🔗</span>
          </p>
          <a href="#" className="view-link">
            View details
          </a>
        </div>
      </div>

      <div className="cards-container">
        {[
          {
            icon: "📦",
            title: "Orders",
            desc: "Track your order progress, request returns, reorder, or write reviews.",
          },
          {
            icon: "🏷️",
            title: "Sales & Offers",
            desc: "Shop all of our promotional offers.",
          },
          {
            icon: "📋",
            title: "My Lists",
            desc: "Add your favorite items to keep track of availability and purchase later!",
          },
          {
            icon: "🤝",
            title: "Affiliate Program",
            desc: "Become an HERB affiliate and earn when you share!",
          },
          {
            icon: "📬",
            title: "Address Book",
            desc: "Manage your delivery address(es) in one convenient place.",
          },
        ].map((item, index) => (
          <div className="card-item" key={index}>
            <h5>
              {item.icon} {item.title}
            </h5>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
