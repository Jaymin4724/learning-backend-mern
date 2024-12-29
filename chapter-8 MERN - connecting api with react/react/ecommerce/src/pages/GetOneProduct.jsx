import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function GetOneProduct() {
  const [product, setProduct] = useState(null);
  const { id } = useParams(); // Use the product ID from the URL params
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch product details from the API using the product ID
    axios
      .get(`http://localhost:8080/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  }, [id]); // Run the effect whenever the ID changes

  return (
    <div className="product-container">
      <style>
        {`
          .product-container {
            padding: 50px;
            margin: 50px;
            font-family: Arial, sans-serif;
            border: black solid 2px;
          }
          .product-details {
            max-width: 600px;
            margin: 0 auto;
            text-align: center;
          }
          .product-details h2 {
            color: #333;
            margin-bottom: 20px;
          }
          .product-details p {
            font-size: 18px;
            color: #555;
          }
          .product-details img {
            width: 150px;
            height: 150px;
            border-radius: 8px;
            object-fit: cover;
            margin-top: 10px;
          }
          .back-button {
            background-color: #007bff;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            margin-top: 20px;
            text-align: center;
          }
          .loading-message {
            font-size: 18px;
            color: #777;
            text-align: center;
          }
        `}
      </style>

      {product ? (
        <div className="product-details">
          <h2>Product Details</h2>
          <p>
            <strong>ID:</strong> {product._id}
          </p>
          <p>
            <strong>Title:</strong> {product.title}
          </p>
          <p>
            <strong>Price:</strong> ${product.price}
          </p>
          <p>
            <strong>Rating:</strong> {product.rating}
          </p>
          <div>
            <img src={product.thumbnail} alt={product.title} />
          </div>
          <button className="back-button" onClick={() => navigate("/products")}>
            Back to Product List
          </button>
        </div>
      ) : (
        <p className="loading-message">Loading product details...</p>
      )}
    </div>
  );
}
