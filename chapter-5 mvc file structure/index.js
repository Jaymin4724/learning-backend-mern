import express from "express";
import productRouter from "./routes/product-routes.js";
import userRouter from "./routes/user-routes.js";

const server = express();
server.use(express.json()); // BodyParser

// Middleware for routers
server.use("/products", productRouter);
server.use("/users", userRouter);

server.listen(8080, () => {
  console.log("Server Started at http://localhost:8080/");
});
