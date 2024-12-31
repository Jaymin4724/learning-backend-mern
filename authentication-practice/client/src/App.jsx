import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./landingPage";
import Form from "./Form";

export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/home" element={<LandingPage />} />
        </Routes>
      </Router>
    </div>
  );
}
