import React, { useState, useEffect, useRef } from "react";
import "../css/Pouse_slider.css";
import { FaChevronLeft, FaChevronRight, FaPause, FaPlay } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router";

const ProductSlider = () => {
  const [products, setProduct] = useState([]);
  const productData = async () => {
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_BASEURL
        }/api/product/getproducts/?category=iherb_live`
      );

      setProduct(res.data);
      console.log(res.data )
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    productData();
  }, []);

  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [visibleCards, setVisibleCards] = useState(4);
  const sliderRef = useRef(null);
  const intervalRef = useRef(null);

  const next = () => {
    setIndex((prev) => (prev + 1) % (products.length - visibleCards + 1));
  };

  const prev = () => {
    setIndex((prev) =>
      prev - 1 < 0 ? products.length - visibleCards : prev - 1
    );
  };

  useEffect(() => {
    const updateVisibleCards = () => {
      if (sliderRef.current) {
        const width = sliderRef.current.offsetWidth;
        const cardWidth = 160;
        const count = Math.floor(width / cardWidth);
        setVisibleCards(count);
      }
    };

    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(next, 3000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, visibleCards]);

  return (
    <div className="slider-wrapper-pouse">
      <div className="slider-header">
        <h3>HERB</h3>
        <span className="live-tag">LIVE</span>
        <button
          className="play-pause-btn"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
      </div>

      <div className="main">
        <button className="arrow left" onClick={prev}>
          <FaChevronLeft />
        </button>

        <div className="slider" ref={sliderRef}>
          {products &&
            products.length > 0 &&
            products.slice(index, index + visibleCards).map((product, i) => (
              <div className="product-card" key={i}>
               <Link to={`description/${product._id}`} style={{ textDecoration: "none" }}>
                <img src={product.image[0]} alt={product.name}  style={{backgroundColor:"white"}}/>
                <p className="name">{product.title}</p>
                <p className="price">  ₹{product.price}</p>
                <p className="country">{product.category}</p>
                <p className="rating">⭐⭐⭐⭐ {product.reviews}</p>
                </Link>
              </div>
            ))}
        </div>

        <button className="arrow right" onClick={next}>
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default ProductSlider;
