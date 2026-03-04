import React, { useEffect, useState } from "react";
import "../css/ProductDetail.css";
import axios from "axios";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../redux/slice/cartSlice";
import { toast } from "react-toastify";

export default function ProductDetail() {
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState({});
  const param = useParams();
  const [mainImgIndex, setMainImgIndex] = useState(0);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const getProductDetails = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASEURL}/api/product/getProductById/${param.id}`
      );
      console.log(res.data);
      setProduct(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  const handleAddToCart = async (product) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BASEURL}/api/cart/addtocart`,
        {
          userId: user?._id,
          productId: product?._id,
          quantity: Number(quantity),
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

      toast.success("Item added to cart!")
    } catch (err) {
      toast.error("Plese login first !");
    }
  };

  const increase = () => setQuantity((q) => q + 1);
  const decrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  return (
    <div className="product-detail-container">
      <div className="product-left">
        <img
          className="main-img"
          src={product?.image?.[mainImgIndex]}
          alt="Main Product"
        />
        <div className="thumbs">
          {product?.image?.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`thumb-${index}`}
              onClick={() => setMainImgIndex(index)}
              className={index === mainImgIndex ? "active-thumb" : ""}
            />
          ))}
        </div>
      </div>

      {/* CENTER - Product Info */}
      <div className="product-center">
        <span className="label-new">{product?.typeofproduct}</span>
        <h2>{product?.title}</h2>
        <p className="brand">
          By <a href="#">HERB</a>
        </p>

        <div className="stock">In stock</div>

        <ul className="product-info-list">
          <li>
            ✅ <b>100% authentic</b>
          </li>
          <li>
            📅 Best by: <b>02/2027</b>
          </li>
          <li>📦 First available: 05/2025</li>
          <li>⚖ Shipping weight: 0.55 kg</li>
          <li>🔢 Product code: NWY-15151</li>
          <li>🔍 UPC: 033674151518</li>
          <li>📦 Package quantity: 130 Count</li>
          <li>📐 Dimensions: 16.6 x 8.8 x 8.6 cm , 0.55 kg</li>
        </ul>
        <div className="description">
          <p>{product?.description}</p>
        </div>

        <div className="rankings">
          <span>Product rankings:</span>
          <p>
            #70 in <a href="#">Senior Multivitamins</a>
          </p>
          <p>
            #741 in <a href="#">Multivitamins</a>
          </p>
        </div>
      </div>

      {/* RIGHT - Price and Cart Actions */}
      <div className="product-right">
        <div className="price-box">
          <p className="original">
            {" "}
            <span className="old-price">
              ₹
              {(
                parseFloat(product.price?.toString().replace(/[^\d.]/g, "")) *
                1.2
              ).toFixed(2)}
            </span>
          </p>
          <p className="current">
            ₹{product?.price}
            <span className="serving">
              ₹{(product?.price / quantity).toFixed(2)}/serving
            </span>
          </p>
          <p className="save">
            You save: ₹{(product?.mrp - product?.price).toFixed(2)} (
            {Math.round(((product?.mrp - product?.price) / product?.mrp) * 100)}
            %)
          </p>
        </div>

        <div className="qty">
          <button onClick={decrease}>−</button>
          <span>{quantity}</span>
          <button onClick={increase}>+</button>
        </div>

        <button
          className="add-to-cart"
          onClick={() => handleAddToCart(product)}
        >
          Add to Cart
        </button>
        <button className="add-to-list">♡ Add to Lists</button>
      </div>
    </div>
  );
}
