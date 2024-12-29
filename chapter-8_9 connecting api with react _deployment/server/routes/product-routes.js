import express from "express";
import {
  createProduct,
  getAllProducts,
  getProducts,
  replaceProduct,
  updateProduct,
  deleteProduct,
} from "../controller/product-controller.js";
const productRouter = express.Router();

productRouter
  .post("/", createProduct)
  .get("/", getAllProducts)
  .get("/:id", getProducts)
  .put("/:id", replaceProduct)
  .patch("/:id", updateProduct)
  .delete("/:id", deleteProduct);

export default productRouter;
