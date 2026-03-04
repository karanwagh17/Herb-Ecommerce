import React from "react";
import "../css/promo.css";
import { Link } from "react-router";

const PromoMenuBanner = () => {
  return (
    <div className="promo-menu-banner">
      <div className="menu-section">
        <Link
          to={`/productgrid/supplements`}
          style={{ textDecoration: "none" }}
        >
          <a href="#">Supplements</a>{" "}
        </Link>
        <Link to={`/productgrid/sports`}>
          <a href="#">Sports</a>{" "}
        </Link>
        <Link to={`/productgrid/bath`}>
          <a href="#">Bath</a>{" "}
        </Link>
        <Link to={`/productgrid/Beauty`}>
          <a href="#">Beauty</a>{" "}
        </Link>
        <Link to={`/productgrid/Grocery`}>
          <a href="#">Grocery</a>{" "}
        </Link>
        <Link to={`/productgrid/Home`}>
          <a href="#">Home</a>{" "}
        </Link>
        <Link to={`/productgrid/Baby`}>
          <a href="#">Baby</a>{" "}
        </Link>
        <Link to={`/productgrid/Pets`}>
          <a href="#">Pets</a>{" "}
        </Link>
      </div>
      {/* <div className="menu-divider sm-none" />
      <div className="menu-section">
        <a href="#">Brands A-Z</a>
        <a href="#">Health Topics</a>
      </div>
      <div className="menu-section right-section">
        <a href="#" className="red">
          Specials
        </a>
        <a href="#">
          <i>Best Sellers</i>
        </a>
        <a href="#">
          <i>Try</i>
        </a>
        <a href="#">
          <i>New</i>
        </a>
        <a href="#" className="green">
          <i>Wellness Hub</i>
        </a>
      </div> */}
    </div>
  );
};

export default PromoMenuBanner;
