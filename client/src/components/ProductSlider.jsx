import React, { useEffect, useState } from "react";
import "../css/ProductSlider.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../redux/slice/cartSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ProductSlider = ({ title, category }) => {
  const [products, setProducts] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 5;
  const dispatch = useDispatch();
  const user = useSelector((store) => store.auth.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_BASEURL
          }/api/product/getproducts?category=${category}`
        );
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };

    fetchData();
  }, [category]);

  const handleAddToCart = async (product) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BASEURL}/api/cart/addtocart`,
        {
          userId: user?._id,
          productId: product?._id,
          quantity: 1,
          price: Number(product?.price?.toString().replace(/[^\d.]/g, "")),
          title: product?.title,
          image: product?.image,
        },
        { withCredentials: true }
      );
      const res = await axios.get(
        `${import.meta.env.VITE_BASEURL}/api/cart/getCartProducts/${user?._id}`,
        { withCredentials: true }
      );
      const updated = res.data.map((item) => ({
        ...item,
        price: parseFloat(item.price),
      }));
      dispatch(addCart(updated));
      toast.success("Item added to cart!");
    } catch (err) {
      console.error("Failed to add to cart", err);

      toast.error("Plese login first!");
    }
  };
  // Slide logic
  const prev = () => setStartIndex((prev) => Math.max(prev - 1, 0));
  const next = () => {
    if (startIndex + visibleCount < products.length) {
      setStartIndex((prev) => prev + 1);
    }
  };

  const visibleProducts = products.slice(startIndex, startIndex + visibleCount);

  return (
    <div className="product-slider-container">
      <h3>
        {title} <button className="view-all-btn"><Link to="productgrid/all" style={{color:"white" ,textDecoration:"none"}}>View all</Link></button>
      </h3>

      <div className="slider-wrapper">
        <div className="arrow-btn left" onClick={prev}>
          &#10094;
        </div>

        <div className="product-list">
          {visibleProducts.map((product, index) => (
            <div key={index} className="product-card">
              <Link
                to={`description/${product._id}`}
                style={{ textDecoration: "none" }}
              >
                {" "}
                <img src={product.image[0]} alt={product.title} />
                <p className="title">{product.title}</p>
                <p className="rating">
                  {"★".repeat(5)}{" "}
                  <span>{product.reviews?.toLocaleString()}</span>
                </p>
              </Link>
              <p className="price">
                <span className="new-price">₹{product.price}</span>
                <span className="old-price">
                  ₹
                  {(
                    parseFloat(
                      product.price?.toString().replace(/[^\d.]/g, "")
                    ) * 1.2
                  ).toFixed(2)}
                </span>
              </p>
              <button
                className="slider-cart"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        <div className="arrow-btn right" onClick={next}>
          &#10095;
        </div>
      </div>
    </div>
  );
};

export default ProductSlider;
