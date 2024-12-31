import React, { useEffect, useState } from "react";
import axios from "axios";

export default function LandingPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Get token from localStorage
    axios
      .get("http://localhost:8080/api/users", {
        headers: {
          Authorization: `Bearer ${token}`, // Send the token in the Authorization header
        },
      })
      .then((response) => {
        console.log(response.data);
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  return (
    <div>
      <h1>All Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.firstname} {user.lastname} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
}
