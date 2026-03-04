import React, { useState } from "react";
import "../css/categoryBanner.css";
import image1 from "../assets/sliderimage-1.avif";
import image2 from "../assets/sliderimage 2.avif";
import image3 from "../assets/slider3.avif";

const slides = [
  {
    backgroundColor: "#fbe29d",
    image: image1,
  },
  {
    backgroundColor: "#ead7e9",
    image: image2,
  },
  {
    backgroundColor: "#ead7e9",
    image: image3,
  },
];

const PromoSlider = () => {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const currentSlide = slides[current];

  return (
    <>
     

      <div
        className="promo-slider"
        style={{ backgroundColor: currentSlide.backgroundColor }}
      >
        <div className="arrow left" onClick={prevSlide}>
          &#10094;
        </div>

        <div className="image-full-width">
          <img src={currentSlide.image} alt="slide visual" />
        </div>

        <div className="arrow right" onClick={nextSlide}>
          &#10095;
        </div>
      </div>
    </>
  );
};

export default PromoSlider;
