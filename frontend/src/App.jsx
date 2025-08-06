import React from "react";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SubcategoryPage from "./pages/SubcategoryPage";
import SingleProductPage from "./pages/SingleProductPage";
import ProductPage from "./pages/ProductPage";
import Footer from "./components/Footer";

import AboutUs from "./pages/AboutUs";
import Brands from "./pages/Brands";
import ContactUs from "./pages/ContactUs";
import Sitemap from "./pages/Sitemap";
import BlogList from "./pages/BlogList";
import BlogForm from "./pages/BlogForm";
import BlogView from "./pages/BlogView";
import SearchResults from "./pages/SearchResults";
import "../src/styles/global.css";
import CustomizerSVG from "./pages/Customize/CustomizerSVG";
import CustomizerAll from "./pages/Customize/CustomizerAll";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs/>} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/post" element={<BlogForm />} />
        <Route path="/blog/:id" element={<BlogView />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/sitemap" element={<Sitemap/>} />
        <Route path="/:category" element={<SubcategoryPage />} />
        <Route path="/:category/:subcategory" element={<ProductPage />} />
        <Route path="/:category/:subcategory/:product" element={<SingleProductPage />} />
        <Route path="/customize/:productType" element={<CustomizerSVG />} />
        <Route path="/customize" element={<CustomizerAll/>} />
      </Routes>
      <Footer />
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored" 
      />
    </div>
  );
}

export default App;