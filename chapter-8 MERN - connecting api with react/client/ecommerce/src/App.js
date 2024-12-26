import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GetOneProduct from "./pages/GetOneProduct";
import GetAllProducts from "./pages/GetAllProducts";
import CreateProduct from "./pages/CreateProduct";
export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<GetAllProducts></GetAllProducts>}></Route>
          <Route path="/products/:id" element={<GetOneProduct />}></Route>
          <Route path="/products" element={<GetAllProducts />}></Route>
          <Route path="/create" element={<CreateProduct />}></Route>
        </Routes>
      </Router>
    </div>
  );
}
