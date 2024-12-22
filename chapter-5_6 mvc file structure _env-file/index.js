import "dotenv/config";
import express from "express";
import productRouter from "./routes/product-routes.js";
import userRouter from "./routes/user-routes.js";

const server = express();
server.use(express.json()); // BodyParser

console.log("env -->", process.env.DB_PASSWORD);
// Middleware for routers
server.use("/products", productRouter);
server.use("/users", userRouter);

server.listen(process.env.PORT, () => {
  console.log(`Server Started at http://localhost:${process.env.PORT}/`);
});
