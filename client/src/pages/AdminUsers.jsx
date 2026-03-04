import axios from "axios";
import React, { useEffect, useState } from "react";
import "../css/AdminUsers.css";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BASEURL}/api/user/getAlluser`,
        { withCredentials: true }
      );
      setUsers(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const toggleAdminRole = async (userId) => {
    try {
      await axios.get(
        `${import.meta.env.VITE_BASEURL}/api/user/assignrole/${userId}`,
        { withCredentials: true }
      );

      // update UI instantly
      setUsers((prev) =>
        prev.map((user) =>
          user._id === userId
            ? { ...user, role: !user.role }
            : user
        )
      );
    } catch (err) {
      alert("Error updating role");
    }
  };

  const deleteUser = async (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      await axios.get(
        `${import.meta.env.VITE_BASEURL}/api/user/delete/${userId}`,
        { withCredentials: true }
      );

      // remove user from UI
      setUsers((prev) => prev.filter((user) => user._id !== userId));

      alert("User deleted successfully");
    } catch (err) {
      alert("Error deleting user");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="admin-users-container">
      <div className="admin-users-card">
        <h2>All Registered Users</h2>

        {loading ? (
          <p>Loading...</p>
        ) : users.length === 0 ? (
          <p>No users found</p>
        ) : (
          <div className="users-grid">
            {users.map((user) => (
              <div key={user._id} className="user-box">
                <h4>{user.name}</h4>
                <p>{user.email}</p>

                <span
                  className={`role-badge ${
                    user.role ? "admin-role" : "user-role"
                  }`}
                >
                  {user.role ? "Admin" : "User"}
                </span>

                <div className="btn-group">
                  <button
                    className={`role-btn ${
                      user.role ? "remove-btn" : "create-btn"
                    }`}
                    onClick={() => toggleAdminRole(user._id)}
                  >
                    {user.role ? "Remove Admin" : "Create Admin"}
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteUser(user._id)}
                  >
                    Delete User
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;