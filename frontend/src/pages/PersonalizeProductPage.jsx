import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SidebarTools from "../components/Personalize/SidebarTools";
import ProductCustomizer from "../components/Personalize/ProductCustomizer";
import CustomizerControls from "../components/Personalize/CustomizerControls";
import ActionButtons from "../components/Personalize/ActionButtons";
import { fabric } from "fabric";
import "../styles/PersonalizeProduct.css";

const PersonalizeProductPage = () => {
  const { category, subcategory, product } = useParams();
  const canvasRef = useRef(null);
  const [productData, setProductData] = useState(null);
  const [color, setColor] = useState("#ffffff");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/${category}/${subcategory}/${product}`
        );
        setProductData(response.data);
      } catch (error) {
        console.error("Failed to fetch product", error);
      }
    };

    fetchProduct();
  }, [category, subcategory, product]);

  const handleAddText = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const text = new fabric.IText("Enter text", {
        left: 50,
        top: 50,
        fill: "#000",
        fontSize: 20,
      });
      canvas.add(text);
      canvas.setActiveObject(text);
    }
  };

  const handleAddImage = () => {
    const imageUrl = prompt("Enter image URL:");
    if (imageUrl) {
      fabric.Image.fromURL(imageUrl, (img) => {
        img.scaleToWidth(100);
        canvasRef.current.add(img);
        canvasRef.current.setActiveObject(img);
      });
    }
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    const json = canvas.toJSON();
    const image = canvas.toDataURL({ format: "png" });

    console.log("Canvas JSON:", json);
    console.log("Preview Image:", image);

    alert("Design saved!");
  };

  const handleAddToCart = () => {
    alert("Added to cart!");
  };

  const handleRequestQuote = () => {
    alert("Request for quote submitted.");
  };

  if (!productData) return <div>Loading...</div>;

  return (
    <div className="personalize-wrapper">
      <SidebarTools onAddText={handleAddText} onAddImage={handleAddImage} />

      <CustomizerControls
        color={color}
        setColor={setColor}
        sizes={productData.size || []}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
        quantity={quantity}
        setQuantity={setQuantity}
      />

      <ProductCustomizer
        productImage={productData.image}
        canvasRef={canvasRef}
      />

      <ActionButtons
        onSave={handleSave}
        onAddToCart={handleAddToCart}
        onRequestQuote={handleRequestQuote}
      />
    </div>
  );
};

export default PersonalizeProductPage;
