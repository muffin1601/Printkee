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
  const [selectedColor, setSelectedColor] = useState("#ff0000"); // default red
  const [deliveryTerm, setDeliveryTerm] = useState("24 hours");
  const [canvas, setCanvas] = useState(null);

  useEffect(() => {
    const c = new fabric.Canvas("canvas-id", { preserveObjectStacking: true });
    setCanvas(c);
  }, []);

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
      <SidebarTools
        onAddText={() => {
          const text = new fabric.IText("Your Text", {
            left: 50,
            top: 50,
            fontSize: 24,
            fill: "#000"
          });
          canvas.add(text).setActiveObject(text);
        }}

        onAddImage={(url) => {
          fabric.Image.fromURL(url, (img) => {
            img.scale(0.5);
            canvas.add(img).setActiveObject(img);
          });
        }}

        onChangeBgColor={() => {
          const color = prompt("Enter a hex color:");
          if (color) {
            canvas.setBackgroundColor(color, canvas.renderAll.bind(canvas));
          }
        }}

        onAddShape={() => {
          const rect = new fabric.Rect({
            width: 100,
            height: 100,
            fill: "blue",
            left: 70,
            top: 70
          });
          canvas.add(rect).setActiveObject(rect);
        }}

        onAddQRCode={() => {
          const qrText = prompt("Enter QR code text:");
          if (!qrText) return;

          const qrApi = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrText)}&size=100x100`;
          fabric.Image.fromURL(qrApi, (img) => {
            canvas.add(img).setActiveObject(img);
          });
        }}

        onManageLayers={() => {
          alert("Layer management not implemented yet.");
        }}

        onUserInfo={() => {
          alert("User info action clicked!");
        }}
      />

      <CustomizerControls
        availableColors={["#000000", "#ffffff", "#ff0000", "#00ff00", "#0000ff", "#ff00ff", "#ffff00", "#ffa500"]}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        sizes={productData?.size || []}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
        quantity={quantity}
        setQuantity={setQuantity}
        deliveryTerm={deliveryTerm}
        setDeliveryTerm={setDeliveryTerm}
        onSave={handleSave}
        onAddToCart={handleAddToCart}
        onQuote={handleRequestQuote}
      />

      <ProductCustomizer
        productImage={productData.image}
        subImages={productData.subImages}
        canvasRef={canvasRef}
      />

      <ActionButtons canvas={canvas} />

    </div>
  );
};

export default PersonalizeProductPage;
