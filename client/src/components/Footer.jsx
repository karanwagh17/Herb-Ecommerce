import React from "react";
import "../css/footer.css";
import qrImage from "../assets/footer-qr.png";
import googlePlay from "../assets/google-play-badge.avif";
import appStore from "../assets/ios_app_store_us.avif";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h4>ABOUT</h4>
        <ul>
          <li>About Us</li>
          <li>
            <span className="new-label">New!</span> Store Reviews
          </li>
          <li>Rewards Program</li>
          <li>Affiliate Program</li>
          <li>We Give Back</li>
        </ul>
      </div>

      <div className="footer-section">
        <h4>COMPANY</h4>
        <ul>
          <li>Corporate</li>
          <li>Press</li>
          <li>Partner with HERB</li>
        </ul>
      </div>

      <div className="footer-section">
        <h4>RESOURCES</h4>
        <ul>
          <li>Wellness Hub</li>
          <li>Sales & Offers</li>
        </ul>
      </div>

      <div className="footer-section">
        <h4>CUSTOMER SERVICE</h4>
        <ul>
          <li>Contact Us</li>
          <li>Suggest a Product</li>
          <li>Order Status</li>
          <li>Shipping</li>
          <li>Communication Preferences</li>
        </ul>
      </div>

      <div className="footer-section mobile-apps">
        <h4>MOBILE APPS</h4>
        <img src={qrImage} alt="QR Code" className="qr-image" />
        <div className="store-badges">
          <a href="https://play.google.com/store/apps/details?id=com.iherb" target="_blank">
            <img src={googlePlay} alt="Google Play" />
          </a>
          <a href="https://apps.apple.com/us/app/iherb-vitamins-supplements/id636609212">
            <img src={appStore} alt="App Store" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
