import React, { useState } from "react";
import "./CreateProduct.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateProduct() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    thumbnail: "",
    price: "",
    rating: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload on form submission
    try {
      const response = await axios.post(
        "http://localhost:8080/products",
        formData
      );
      console.log("Product created successfully:", response.data);
      alert("Product created successfully!");
      navigate("/products");
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Failed to create product. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <h2>Create New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Product Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter product title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="thumbnail">Thumbnail URL:</label>
          <input
            type="url"
            id="thumbnail"
            name="thumbnail"
            value={formData.thumbnail}
            onChange={handleChange}
            placeholder="Enter thumbnail URL"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            step="0.1"
            min="0"
            max="5"
            placeholder="Enter rating"
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Create Product
        </button>
      </form>
    </div>
  );
}
