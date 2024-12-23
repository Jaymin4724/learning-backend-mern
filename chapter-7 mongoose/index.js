import "dotenv/config";
import express from "express";
import mongoose from "mongoose";

import productRouter from "./routes/product-routes.js";
import userRouter from "./routes/user-routes.js";

const server = express();

// db connection
// mongoose.connect("mongodb://localhost:27017/ecommerce");
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://localhost:27017/ecommerce");
  console.log("mongooseeeeebumps --> DB Connected !!");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

server.use(express.json()); // BodyParser
console.log("env -->", process.env.DB_PASSWORD);
// Middleware for routers
server.use("/products", productRouter);
server.use("/users", userRouter);

server.listen(process.env.PORT, () => {
  console.log(`Server Started at http://localhost:${process.env.PORT}/`);
});
