import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRouter from "./routes/auth-routes.js";
import productRouter from "./routes/product-routes.js";
import userRouter from "./routes/user-routes.js";
import path, { dirname } from "path";
import jwt from "jsonwebtoken";
const server = express();

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Validate required environment variables
if (!process.env.MONGO_URL || !process.env.PUBLIC_DIR || !process.env.PORT) {
  console.error("Missing required environment variables!");
  process.exit(1); // Exit if any required variable is missing
}

// db connection
main().catch((err) => {
  console.error("DB Connection failed: ", err);
});
async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("mongooseeeeebumps --> DB Connected !!");
  } catch (error) {
    console.error("Database connection error: ", error);
  }
}

// Middlewares
// Auth Middleware
const auth = (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    // Check if the Authorization header exists
    if (!authHeader) {
      return res.status(401).json({ error: "Authorization header missing" });
    }
    const token = authHeader.split("Bearer ")[1];
    // Check if the token exists
    if (!token) {
      return res.status(401).json({ error: "Token missing or malformed" });
    }
    // Verify the token
    const decoded = jwt.verify(token, process.env.SECRET);
    // Attach decoded data to the request object for use in other routes
    req.user = decoded;
    // Call the next middleware
    next();
  } catch (err) {
    // Handle specific JWT errors
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token" });
    } else if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired" });
    }
    // For other unexpected errors
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Middleware for routers
server.use(cors());
server.use(express.json()); // BodyParser
server.use(express.static(path.resolve(__dirname, process.env.PUBLIC_DIR)));
server.use("/api/auth", authRouter);
server.use("/api/products", auth, productRouter);
server.use("/api/users", auth, userRouter);

// for wildcard routes (react routes)
server.use("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, process.env.PUBLIC_DIR, "index.html"));
});

server.listen(process.env.PORT, () => {
  console.log(`Server Started at http://localhost:${process.env.PORT}/`);
});
