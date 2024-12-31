import "dotenv/config";
import express from "express";
import { connect } from "mongoose";
import UserRouter from "./routes/UserRoutes.js";
import AuthRouter from "./routes/AuthRoutes.js";
import jwt from "jsonwebtoken";
import cors from "cors";
const server = express();

// db connection
main().catch((err) => {
  console.error("DB Connection failed: ", err);
});
async function main() {
  try {
    await connect(process.env.MONGO_URL);
    console.log("mongooseeeeebumps --> DB Connected !!");
  } catch (error) {
    console.error("Database connection error: ", error);
  }
}

//middlewares
const Auth = (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      return res.status(401).json({ error: "Authorization header missing" });
    }
    const token = authHeader.split("Bearer ")[1];
    if (!token) {
      return res.status(401).json({ error: "Token missing or malformed" });
    }
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token" });
    } else if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired" });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
};
server.use(cors());
server.use(express.json()); // helps to read json from body --> bodyparser
server.use("/api/auth", AuthRouter);
server.use("/api/users", Auth, UserRouter);
server.listen(process.env.PORT, () => {
  console.log(`Server Started at http://localhost:${process.env.PORT}/`);
});
