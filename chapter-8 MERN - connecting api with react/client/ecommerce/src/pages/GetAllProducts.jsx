import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function GetAllProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:8080/products/")
      .then((response) => {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  // Function to delete a product
  const handleDelete = async (id) => {
    try {
      // API call to delete the product
      await axios.delete(`http://localhost:8080/products/${id}`);
      // Update the state to remove the deleted product
      const updatedProducts = products.filter((product) => product._id !== id);
      setProducts(updatedProducts);
      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product. Please try again.");
    }
  };

  // Function to view a single product
  const handleView = (product) => {
    // Navigate to a product details page, passing the product ID as a parameter
    navigate(`/products/${product._id}`);
  };

  return (
    <div style={{ margin: "20px" }}>
      <h2>All Products</h2>
      <button
        style={{
          marginBottom: "20px",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          padding: "10px 15px",
          borderRadius: "4px",
          cursor: "pointer",
        }}
        onClick={() => navigate("/create")} // Navigate to '/create'
      >
        Create New Product
      </button>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
        }}
        border="1"
      >
        <thead>
          <tr style={{ backgroundColor: "#f4f4f4" }}>
            <th>ID</th>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Price</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product._id}>
                <td style={{ textAlign: "center" }}>{product._id}</td>
                <td style={{ textAlign: "center" }}>
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    style={{ width: "50px", height: "50px" }}
                  />
                </td>
                <td style={{ textAlign: "center" }}>{product.title}</td>
                <td style={{ textAlign: "center" }}>${product.price}</td>
                <td style={{ textAlign: "center" }}>{product.rating}</td>
                <td style={{ textAlign: "center" }}>
                  <button
                    style={{
                      marginRight: "10px",
                      backgroundColor: "#007bff",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleView(product)}
                  >
                    View
                  </button>
                  <button
                    style={{
                      backgroundColor: "#dc3545",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No Products Available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
