import React from "react";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SubcategoryPage from "./pages/SubcategoryPage";
import ProductPage from "./pages/ProductPage";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:category" element={<SubcategoryPage />} />
        <Route path="/:category/:subcategory" element={<ProductPage />} />
        {/* <Route path="/:category/:subcategory/:product" element={<SingleProductPage/>} /> */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
