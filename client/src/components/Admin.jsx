import React, { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import AdminDash from "../pages/AdminDash";
import axios from "axios";
import Addproduct from "../pages/Addproduct";
import AdminUsers from "../pages/AdminUsers";
import AdminProducts from "../pages/AdminProducts";

const Admin = () => {
  const [activePage, setActivePage] = useState("dashboard");
  const fetchAllOrders = () => {
    axios.get(`${import.meta.env.VITE_BASEURL}/api/order/all`, { withCredentials: true })
      .then(response => {
        console.log("Orders data:", response.data);
      })
      .catch(error => {
        console.error("Error fetching orders:", error);
      });   
  }
  useState(() => {
    fetchAllOrders();
  }, [])

  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar 
        activePage={activePage} 
        setActivePage={setActivePage} 
      />

      <div style={{ flex: 1, padding: "30px" }}>
        {activePage === "dashboard" && <AdminDash/>}
        {activePage === "addProduct" && <Addproduct/>}
        {activePage === "users" && <AdminUsers/>}
        {activePage === "orders" && <h1>Orders Page</h1>}
        {activePage === "products" &&<AdminProducts/>}
      </div>
    </div>
  );
};

export default Admin;