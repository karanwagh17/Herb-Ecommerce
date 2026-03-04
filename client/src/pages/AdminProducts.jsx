import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/AdminProducts.css";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({});
  const [search, setSearch] = useState("");

  // 🔥 Fetch Products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASEURL}/api/product/getproducts`,
        { withCredentials: true }
      );
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🔍 Search Products
  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASEURL}/api/product/getproducts?search=${search}`,
        { withCredentials: true }
      );
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 🗑 Delete Product
  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm("Delete this product?");
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_BASEURL}/api/product/admin/delete-product`,
        {
          data: { id },
          withCredentials: true,
        }
      );

      setProducts(products.filter((p) => p._id !== id));
      alert("Product deleted");
    } catch (err) {
      alert("Error deleting product");
    }
  };

  // ✏ Edit Click
  const handleEditClick = (product) => {
    setEditingProduct(product._id);
    setFormData(product);
  };

  // 🔁 Handle Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 💾 Save Edit
  const handleSave = async () => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BASEURL}/api/product/admin/edit-product/${editingProduct}`,
        formData,
        { withCredentials: true }
      );

      setProducts((prev) =>
        prev.map((p) =>
          p._id === editingProduct ? res.data : p
        )
      );

      setEditingProduct(null);
      alert("Product updated successfully");
    } catch (err) {
      alert("Error updating product");
    }
  };

  return (
    <div className="admin-products-container">
      <h2>Manage Products</h2>

      {/* 🔍 Search Section */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search by title or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={fetchProducts}>Reset</button>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card">

            {editingProduct === product._id ? (
              <>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
                <input
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                />
                <input
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                />
                <button onClick={handleSave}>Save</button>
                <button onClick={() => setEditingProduct(null)}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <img
                  src={product.image?.[0]}
                  alt={product.title}
                />
                <h4>{product.title}</h4>
                <p>₹{product.price}</p>
                <p>{product.category}</p>

                <div className="btn-group">
                  <button
                    className="edit-btn"
                    onClick={() => handleEditClick(product)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteProduct(product._id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;