import express from "express";
import { readFileSync } from "fs";
const server = express();
const data = JSON.parse(readFileSync("data.json", "utf-8")).products;

server.use(express.json()); // BodyParser

// API ROOT, Base URL, for example: google.com/api/v2

// READ Get /products
server.get("/products", (req, res) => {
  res.json(data);
});

// CRUD APIs
// CREATE POST /products
server.post("/products", (req, res) => {
  data.push(req.body);
  res.status(201).json(data);
});

// READ Get /products/:id
server.get("/products/:id", (req, res) => {
  const id = +req.params.id;
  const product = data.find((p) => p.id === id);
  res.json(product);
});

// UPDATE Put /products/:id --> overwrite
server.put("/products/:id", (req, res) => {
  const id = +req.params.id;
  const productIndex = data.findIndex((p) => p.id === id);
  // Update the product in place using splice
  data.splice(productIndex, 1, { id: id, ...req.body });
  res.json(data[productIndex]); // Return the updated product
});

// UPDATE Patch /products/:id --> append
server.patch("/products/:id", (req, res) => {
  const id = +req.params.id; // Parse the id from the URL
  const productIndex = data.findIndex((p) => p.id === id);
  const updatedProduct = { ...data[productIndex], ...req.body };
  data[productIndex] = updatedProduct;
  res.json(updatedProduct); // Return the updated products array
});

// DELETE Delete /products/:id
server.delete("/products/:id", (req, res) => {
  const id = +req.params.id;
  const productIndex = data.findIndex((p) => p.id === id);
  const deletedProduct = data.splice(productIndex, 1);
  console.log("deleted product : ", deletedProduct);
  res.json(data);
});

server.listen(8080, () => {
  console.log("Server Started at http://localhost:8080/");
});
