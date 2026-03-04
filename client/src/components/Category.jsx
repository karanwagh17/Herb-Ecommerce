import React from "react";
import "../css/category.css";

import supplementsIcon from "../assets/supplements.png";
import sportsIcon from "../assets/Sport.png";
import bathIcon from "../assets/Bath.png";
import beautyIcon from "../assets/Beauty.png";
import groceryIcon from "../assets/Grocery_v2.png";
import homeIcon from "../assets/Health_v2.png";
import babyIcon from "../assets/Baby_v2.png";
import petsIcon from "../assets/Pets_v2.png";
import { Link } from "react-router-dom";
const categories = [
  {
    label: "supplements",
    icon: supplementsIcon,
  },
  { label: "sports", icon: sportsIcon },
  {
    label: "bath",
    icon: bathIcon,
  },
  { label: "Beauty", icon: beautyIcon },
  { label: "Grocery", icon: groceryIcon },
  { label: "Home", icon: homeIcon },
  { label: "Baby", icon: babyIcon },
  { label: "Pets", icon: petsIcon },
];
const subcategories = [
  "Vitamins",
  "Immune Support",
  "GLP-1 Support",
  "Minerals",
  "Heart",
  "Energy",
  "Herbs",
  "Bone, Joint & Cartilage",
  "Digestive Support",
];

const CategorySection = () => {
  return (
    <div className="category-wrapper">
      <h3 className="section-title">Shop by category</h3>
      <div className="category-grid">
        {categories.map((cat, index) => (
          <div className="category-item" key={index}>
            <Link
              to={`/productgrid/${encodeURIComponent(cat.label)}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <div className="icon-circle">
                <img src={cat.icon} alt={cat.label} />
              </div>
              <p>{cat.label}</p>
            </Link>
          </div>
        ))}
      </div>

      <h3 className="section-title">Selected for you</h3>
      <div className="subcategory-list">
        {subcategories.map((sub, index) => (
          <div className="subcategory-item" key={index}>
            {sub}
          </div>
        ))}
        <div className="subcategory-next">&#8250;</div>
      </div>
    </div>
  );
};

export default CategorySection;
