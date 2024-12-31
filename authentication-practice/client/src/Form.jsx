import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Form.css";

export default function Form() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(""); // To store error messages
  const [loading, setLoading] = useState(false); // To show loading indicator

  // Function to handle signup
  const createUser = async (userData) => {
    setLoading(true);
    setError(""); // Reset previous error
    try {
      const api = "http://localhost:8080/api/auth/signup";
      const response = await axios.post(api, userData);
      const token = response.data.token;
      localStorage.setItem("token", token); // Save the token in localStorage
      console.log("User created successfully:", response.data);
      alert("Signup successful!");
    } catch (error) {
      setError(
        error.response?.data?.error || "Failed to sign up. Please try again."
      );
      console.error(
        "Error creating user:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // Function to handle login
  const loginUser = async (userData) => {
    setLoading(true);
    setError(""); // Reset previous error
    try {
      const api = "http://localhost:8080/api/auth/login";
      const response = await axios.post(api, userData);
      const token = response.data.token;
      localStorage.setItem("token", token); // Save the token in localStorage
      console.log("Login successful:", response.data);
      alert("Login successful!");
      navigate("/home"); // Redirect to home after successful login
    } catch (error) {
      setError(
        error.response?.data?.error ||
          "Failed to log in. Please check your credentials."
      );
      console.error("Error logging in:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.value; // Check which button was clicked

    if (action === "login") {
      console.log("Login:", user);
      loginUser(user); // Call login API
    } else if (action === "signup") {
      console.log("Signup:", user);
      createUser(user); // Call signup API
    }
    setUser({ firstname: "", lastname: "", email: "", password: "" });
  };

  return (
    <div className="container">
      <div
        style={{
          border: "brown 5px solid",
          padding: "30px",
          borderRadius: "20px",
        }}
      >
        <form className="flex-column" onSubmit={handleSubmit}>
          <div className="flex-row">
            <label htmlFor="firstname" style={{ flex: "1" }}>
              First Name
            </label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              placeholder="Jaymin"
              value={user.firstname}
              onChange={(e) => setUser({ ...user, firstname: e.target.value })}
              required
            />
          </div>
          <div className="flex-row">
            <label htmlFor="lastname" style={{ flex: "1" }}>
              Last Name
            </label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              placeholder="Dave"
              value={user.lastname}
              onChange={(e) => setUser({ ...user, lastname: e.target.value })}
              required
            />
          </div>
          <div className="flex-row">
            <label htmlFor="email" style={{ flex: "1" }}>
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="jaymin4724@gmail.com"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              required
            />
          </div>
          <div className="flex-row">
            <label htmlFor="password" style={{ flex: "1" }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="123456"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <div className="flex-row">
            <button
              type="submit"
              value="login"
              style={{ flex: "1" }}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            <button
              type="submit"
              value="signup"
              style={{ flex: "1" }}
              disabled={loading}
            >
              {loading ? "Signing up..." : "Signup"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
