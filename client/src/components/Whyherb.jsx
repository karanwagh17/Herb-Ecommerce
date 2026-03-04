import React from "react";
import "../css/Whyherb.css"


import icon1 from "../assets/authentic.png"; 
import icon2 from "../assets/warehouse.png";
import icon3 from "../assets/chat.png";
import icon4 from "../assets/review.png";

const WhyIHerb = () => {
  return (
    <div className="why-iherb-wrapper">
      <h2 className="why-title">Why HERB ?</h2>
      <div className="why-iherb-section">
        <div className="why-box">
          <img src={icon1} alt="authentic products" />
          <h3>50,000+ Authentic<br />products</h3>
          <p>Directly sourced products from<br />authorized distributors.</p>
        </div>
        <div className="why-box">
          <img src={icon2} alt="freshness" />
          <h3>Freshness guaranteed</h3>
          <p>Temperature-controlled facilities<br />to ensure quality.</p>
        </div>
        <div className="why-box">
          <img src={icon3} alt="customer service" />
          <h3>24/7 customer service</h3>
          <p>Customer service is a click away.</p>
        </div>
        <div className="why-box">
          <img src={icon4} alt="reviews" />
          <h3>Genuine reviews</h3>
          <p>Verified customer reviews help<br />you make smarter buying choices.</p>
        </div>
      </div>
    </div>
  );
};

export default WhyIHerb;
