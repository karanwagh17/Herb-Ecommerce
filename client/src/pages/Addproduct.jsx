import React, { useState } from "react";
import axios from "axios";
import "../css/AddProduct.css";

const Addproduct = () => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    typeofproduct: "",
    highlights: "",
    images: "", // 🔥 URL input
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Validation
  const validateForm = () => {
    let newErrors = {};

    if (!formData.title.trim())
      newErrors.title = "Title is required";

    if (!formData.price)
      newErrors.price = "Price is required";
    else if (Number(formData.price) <= 0)
      newErrors.price = "Price must be greater than 0";

    if (!formData.description.trim())
      newErrors.description = "Description is required";

    if (!formData.category.trim())
      newErrors.category = "Category is required";

    if (!formData.typeofproduct.trim())
      newErrors.typeofproduct = "Product type is required";

    if (!formData.highlights.trim())
      newErrors.highlights = "Highlights required";

    if (!formData.images.trim())
      newErrors.images = "At least one image URL required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // 🔥 Convert comma separated string to array
    const imageArray = formData.images
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item !== "");

    const highlightsArray = formData.highlights
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item !== "");

    const payload = {
      title: formData.title.trim(),
      price: Number(formData.price),
      description: formData.description.trim(),
      category: formData.category.trim(),
      typeofproduct: formData.typeofproduct.trim(),
      highlights: highlightsArray,
      image: imageArray, // ✅ correct field name as schema
      reviews: 0,
    };

    try {
      await axios.post(
        `${import.meta.env.VITE_BASEURL}/api/product/admin/add-product`,
        payload,
        { withCredentials: true }
      );

      alert("✅ Product Added Successfully");

      setFormData({
        title: "",
        price: "",
        description: "",
        category: "",
        typeofproduct: "",
        highlights: "",
        images: "",
      });

      setErrors({});
    } catch (error) {
      console.error(error);
      alert("❌ Error adding product");
    }
  };

  return (
    <div className="admin-add-container">
      <div className="admin-card">
        <h2>Add New Product</h2>

        <form onSubmit={handleSubmit} className="admin-form">

          <input
            type="text"
            name="title"
            placeholder="Product Title"
            value={formData.title}
            onChange={handleChange}
          />
          <p className="error">{errors.title}</p>

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
          />
          <p className="error">{errors.price}</p>

          <textarea
            name="description"
            placeholder="Product Description"
            value={formData.description}
            onChange={handleChange}
          />
          <p className="error">{errors.description}</p>

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
          />
          <p className="error">{errors.category}</p>

          <input
            type="text"
            name="typeofproduct"
            placeholder="Type of Product"
            value={formData.typeofproduct}
            onChange={handleChange}
          />
          <p className="error">{errors.typeofproduct}</p>

          <input
            type="text"
            name="highlights"
            placeholder="Highlights (comma separated)"
            value={formData.highlights}
            onChange={handleChange}
          />
          <p className="error">{errors.highlights}</p>

          {/* 🔥 Image URL Input */}
          <input
            type="text"
            name="images"
            placeholder="Image URLs (comma separated)"
            value={formData.images}
            onChange={handleChange}
          />
          <p className="error">{errors.images}</p>

          <button type="submit">Add Product</button>
        </form>
      </div>
    </div>
  );
};

export default Addproduct;