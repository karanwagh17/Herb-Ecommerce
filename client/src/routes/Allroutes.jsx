import React from "react";
import { Route, Routes } from "react-router";
import Home from "../pages/Home";
// import Login from "../pages/Login";
import Login from "../pages/Login";
import Signup from "../pages/signup";
import Otp from "../pages/otp";
import Dashboard from "../pages/Dashboard";
import ProductGrid from "../pages/ProductGrid";
import CartPage from "../pages/CartPage";
import ProductDetail from "../pages/ProductDescription";
import CheckoutPage from "../pages/CheckoutPage";
import AddressForm from "../components/AddressForm";
import Orders from "../components/orders";
import Admin from "../components/Admin";
import EditProduct from "../pages/EditProduct";

const Allroutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/otp" element={<Otp />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/productgrid/:category" element={<ProductGrid />}></Route>
      <Route path="/account" element={<Dashboard />}></Route>
      <Route path="/cart" element={<CartPage />}></Route>
      <Route path="/description/:id" element={<ProductDetail />}></Route>
      <Route
        path="/:category/description/:id"
        element={<ProductDetail />}
      ></Route>
      <Route path="/checkout" element={<CheckoutPage />}></Route>
      <Route path="/address" element={<AddressForm />}></Route>
      <Route path="/orders" element={<Orders />}></Route>
      <Route path="/admin" element={<Admin />}></Route>
      <Route path="/admin/edit-product/:id" element={<EditProduct />} />

      <Route path="*" element={<h1>Page Not Found</h1>}></Route>
    </Routes>
  );
};

export default Allroutes;
