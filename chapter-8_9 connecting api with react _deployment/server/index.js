import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import productRouter from "./routes/product-routes.js";
import userRouter from "./routes/user-routes.js";
import path, { dirname } from "path";
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

server.use(express.json()); // BodyParser

// Avoid logging sensitive data like DB_PASSWORD
// console.log("env -->", process.env.DB_PASSWORD);

// Middleware for routers
server.use(cors());
server.use(express.static(path.resolve(__dirname, process.env.PUBLIC_DIR)));
server.use("/api/products", productRouter);
server.use("/api/users", userRouter);

// for wildcard routes (react routes)
server.use("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, process.env.PUBLIC_DIR, "index.html"));
});

server.listen(process.env.PORT, () => {
  console.log(`Server Started at http://localhost:${process.env.PORT}/`);
});
