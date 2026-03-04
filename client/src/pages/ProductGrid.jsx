import React, { useEffect, useState } from "react";
import "../css/ProductGrid.css";
import axios from "axios";
import { useParams, useLocation, Link } from "react-router-dom";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("Featured");
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);

  const { category } = useParams();
  const product_cat= category || ""
 
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get("search");

  const priceRanges = [
    { label: "₹0 - ₹500", value: "0-500", min: 0, max: 500 },
    { label: "₹500 - ₹1500", value: "500-1500", min: 500, max: 1500 },
    { label: "₹2000+", value: "2000+", min: 2000, max: 100000 },
  ];

  const handlePriceChange = (rangeValue) => {
    if (selectedPriceRanges.includes(rangeValue)) {
      setSelectedPriceRanges(selectedPriceRanges.filter((r) => r !== rangeValue));
    } else {
      setSelectedPriceRanges([...selectedPriceRanges, rangeValue]);
    }
  };

  const getDataFromApi = async () => {
    try {
      let sortQuery = "";
      if (sortOrder === "Price Low to High") sortQuery = "&sort=asc";
      else if (sortOrder === "Price High to Low") sortQuery = "&sort=desc";

      let priceFilters = priceRanges
        .filter((r) => selectedPriceRanges.includes(r.value))
        .map((r) => `minPrice=${r.min}&maxPrice=${r.max}`);
      let priceQuery = priceFilters.length ? "&" + priceFilters.join("&") : "";

      let searchQuery = search ? `&search=${search}` : "";

      const res = await axios.get(
        `${import.meta.env.VITE_BASEURL}/api/product/getproducts?category=${product_cat}${sortQuery}${priceQuery}${searchQuery}`
      );
      setProducts(res?.data);
      console.log(res)
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getDataFromApi();
  }, [category, sortOrder, selectedPriceRanges, search]);

  return (
    <div className="product-page">
      <div className="filters">
        <div className="filter-section">
          <h4>Price</h4>
          <div>
            {priceRanges.map((range) => (
              <label key={range.value}>
                <input
                  type="checkbox"
                  checked={selectedPriceRanges.includes(range.value)}
                  onChange={() => handlePriceChange(range.value)}
                />
                {range.label}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="product-grid">
        <div className="sort-options">
          <span>Sort by:</span>
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="Featured">Featured</option>
            <option value="Price Low to High">Price Low to High</option>
            <option value="Price High to Low">Price High to Low</option>
          </select>
        </div>

        <div className="products">
          {products.map((product) => (
            <div className="product-card" key={product._id}>
              <Link to={`/${product.typeofproduct}/description/${product._id}`} style={{ textDecoration: "none" }}>
                <img src={product.image[0]} alt={product.title} />
                <h3>{product.title}</h3>
                <p>{product.typeofproduct}</p>
                <p>{product.category}</p>
                <span className="price">₹{product.price}</span>
                <span>⭐⭐⭐⭐ {product.reviews}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
