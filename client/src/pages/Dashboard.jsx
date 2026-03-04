import React, { useState } from "react";
// import Sidebar from "../components/Sidebar";
// import DashboardContent from "../components/DashboardContent";
// import Orders from "../components/Orders";
// import AddressBook from "../components/AddressBook";
// import MyLists from "../components/MyLists";
import "../css/dashboard.css";
import Sidebar from "../components/sidebar";
import DashboardComp from "../components/Dashprofile";
import Orders from "../components/orders";
import AccountInfo from "../components/AccountInfo";
import AddressForm from "../components/AddressForm";

const Dashboard = () => {
  const [activePage, setActivePage] = useState("dashboard");

  const renderComponent = () => {
    switch (activePage) {
        
      case "orders":
        return <Orders />;
      case "account":
        return <AccountInfo />;
      case "address":
        return <AddressForm/>;
      case "lists":
        return "My list component";
      default:
        return <DashboardComp />;
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar setActivePage={setActivePage} />
      <div className="main-content">{renderComponent()}</div>
    </div>
  );
};

export default Dashboard;
