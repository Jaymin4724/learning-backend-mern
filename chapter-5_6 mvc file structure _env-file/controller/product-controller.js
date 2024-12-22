import { readFileSync } from "fs";
const data = JSON.parse(readFileSync("data.json", "utf-8")).products;

const createProduct = (req, res) => {
  data.push(req.body);
  res.status(201).json(data); // 201: Created
};

const getProducts = (req, res) => {
  const id = +req.params.id;
  const product = data.find((p) => p.id === id);
  if (product) {
    res.status(200).json(product); // 200: OK
  } else {
    res.status(404).json({ message: "Product not found" }); // 404: Not Found
  }
};

const getAllProducts = (req, res) => {
  res.status(200).json(data); // 200: OK
};

const updateProduct = (req, res) => {
  const id = +req.params.id; // Parse the id from the URL
  const productIndex = data.findIndex((p) => p.id === id);
  if (productIndex !== -1) {
    const updatedProduct = { ...data[productIndex], ...req.body };
    data[productIndex] = updatedProduct;
    res.status(200).json(updatedProduct); // 200: OK
  } else {
    res.status(404).json({ message: "Product not found" }); // 404: Not Found
  }
};

const replaceProduct = (req, res) => {
  const id = +req.params.id;
  const productIndex = data.findIndex((p) => p.id === id);
  if (productIndex !== -1) {
    data.splice(productIndex, 1, { id: id, ...req.body });
    res.status(200).json(data[productIndex]); // 200: OK
  } else {
    res.status(404).json({ message: "Product not found" }); // 404: Not Found
  }
};

const deleteProduct = (req, res) => {
  const id = +req.params.id;
  const productIndex = data.findIndex((p) => p.id === id);
  if (productIndex !== -1) {
    const deletedProduct = data.splice(productIndex, 1);
    console.log("deleted product : ", deletedProduct);
    res.status(200).json({ message: "Product deleted", data }); // 200: OK
  } else {
    res.status(404).json({ message: "Product not found" }); // 404: Not Found
  }
};

export {
  createProduct,
  getAllProducts,
  getProducts,
  updateProduct,
  replaceProduct,
  deleteProduct,
};
